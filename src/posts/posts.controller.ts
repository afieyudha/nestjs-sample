import { Controller, Get, Post, Put, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postsService.fetchAndSavePosts();
  }

  @Get(':id')
  async getPost(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postsService.getPost(id);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto);
  }

  @Put(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Patch(':id')
  async patchPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.patchPost(id, updatePostDto);
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postsService.deletePost(id);
  }
}