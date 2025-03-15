import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import axios from 'axios';
import { Cache } from 'cache-manager';

@Injectable()
export class PostsService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async fetchAndSavePosts(): Promise<Post[]> {
    const cachedPosts = await this.cacheManager.get<Post[]>('posts');
    if (cachedPosts) return cachedPosts;

    const { data } = await axios.get(this.apiUrl);
    const posts = await this.postsRepository.save(data); // `data` adalah array, jadi ini benar
    await this.cacheManager.set('posts', posts, 60);
    return posts; // Mengembalikan array Post[]
  }

  async getPost(id: number): Promise<Post> {
    const cacheKey = `post_${id}`;
    const cachedPost = await this.cacheManager.get<Post>(cacheKey);
    if (cachedPost) return cachedPost;
  
    const { data } = await axios.get(`${this.apiUrl}/${id}`);
    const post = this.postsRepository.create(data); // Membuat instance Post
    await this.postsRepository.save(post); // Menyimpan ke database
    const savedPost = await this.postsRepository.findOneBy({ id }); // Ambil entitas yang baru disimpan
    if (!savedPost) {
      throw new NotFoundException(`Post with ID ${id} not found after saving`);
    }
    await this.cacheManager.set(cacheKey, savedPost, 60);
    return savedPost; // Pastikan mengembalikan Post tunggal
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { data } = await axios.post(this.apiUrl, createPostDto);
    const post = this.postsRepository.create({ ...createPostDto, id: data.id });
    await this.postsRepository.save(post);
    await this.cacheManager.del('posts'); // Invalidate cache
    return post;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await axios.put(`${this.apiUrl}/${id}`, updatePostDto);
    const result = await this.postsRepository.update(id, updatePostDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    const updatedPost = await this.postsRepository.findOneBy({ id });
    if (!updatedPost) {
      throw new NotFoundException(`Post with ID ${id} not found after update`);
    }
    await this.cacheManager.del(`post_${id}`);
    await this.cacheManager.del('posts');
    return updatedPost;
  }

  async patchPost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await axios.patch(`${this.apiUrl}/${id}`, updatePostDto);
    const result = await this.postsRepository.update(id, updatePostDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    const updatedPost = await this.postsRepository.findOneBy({ id });
    if (!updatedPost) {
      throw new NotFoundException(`Post with ID ${id} not found after patch`);
    }
    await this.cacheManager.del(`post_${id}`);
    await this.cacheManager.del('posts');
    return updatedPost;
  }

  async deletePost(id: number): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    await this.cacheManager.del(`post_${id}`);
    await this.cacheManager.del('posts');
  }
}