import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { posts } from 'src/data/posts';
import { CreatePost } from 'src/lib/createPost.post';



@Controller('posts')
export class PostsController {
    @Get('sort')
    getPostsBySort(@Query('num', ParseIntPipe) num:number){
        const getPosts=posts.filter(post => Number(post.id) > num)
        return getPosts
    }
    @Get()
    getPosts(){
        return posts
    }
    @Get(':id')
    getPost(@Param('id') id:string){
        return posts.find(post => post.id === Number(id))
    }
    @Post('upload')
    @UsePipes(new ValidationPipe())
    addPost(@Body() postValue:CreatePost){
        posts.push(
            {
                id: posts.length + 1,
                ...postValue
            }
        )
        return posts
    }
}
