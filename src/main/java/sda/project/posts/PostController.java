package sda.project.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Date;
import java.util.List;

@RestController
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(@RequestBody Post postParam){
        return postService.create(postService.generatePost(postParam));
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts(){
        return ResponseEntity.ok(postService.findAllPostByDateDec());
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id){
        return ResponseEntity.ok(postService.fetchPostById(id));
    }

    @PutMapping("/posts/{id}")
    public ResponseEntity<Post> postUpdate(@PathVariable Long id, @RequestBody Post post){
        Post existingPost = postService.fetchPostById(id);
        return postService.create(postService.update( post, existingPost));
    }


    @DeleteMapping("/posts/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable Long id){
        postService.deletePostById(id);
    }

    //Method for post sorted by topics
    @GetMapping(value ="/posts",params = {"topic"})
    public ResponseEntity<List<Post>> getPostByTopic(@RequestParam String topic) {
        return ResponseEntity.ok(postService.fetchPostByTopic(topic));
    }

    @GetMapping (value ="/posts" , params = "author")
    public ResponseEntity<List<Post>> getPostByAuthor(@RequestParam User author ) {
        return ResponseEntity.ok(postService.fetchPostByAuthor(author));
    }

}
