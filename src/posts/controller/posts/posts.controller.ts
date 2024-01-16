import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { posts } from 'src/data/posts';
import { PatchPost } from 'src/lib/PatchPost';
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
    @Patch('edit/:id')
    @UsePipes(new ValidationPipe())
    updatePost(@Param('id', ParseIntPipe) id:number,@Body() value:PatchPost){   
        posts.forEach((post,index)=>{
            if(id===post.id){
                posts[index]={...post,...value}
            }
        })
        return posts
    }

    @Put('put/:id')
    @UsePipes(new ValidationPipe())
    putPost(@Param('id', ParseIntPipe) id:number,@Body() value:PatchPost){ 
        console.log(id)  
        const updatePost=posts.map((post)=>post.id===id?{id,...value}:post)
        return updatePost
    }
    @Delete('delete/:id')
    deletePosts(@Param('id', ParseIntPipe) id:number){
        return posts.filter((post)=>post.id!==id)
    }
}
