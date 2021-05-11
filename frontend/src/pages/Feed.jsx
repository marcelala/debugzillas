import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from 'react-select';


// Project files
import PostApi from "../api/PostApi";
import PostCard from "../components/Post/PostCard";
import PostForm from "../components/Post/PostForm";
import Banner from "../components/Banner";
import Topics from "../components/Topics";



export const Feed = () => {
    // Local state
  const [posts, setPosts] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  const sorterOptions=[
    {value: 'dateAscending', label: 'Date ascending' },
  { value: 'dateDescending', label: 'Date descending' }]

  // Methods
  async function createPost(postData) {
    try {
      const response = await PostApi.createPost(postData);
      const post = response.data;
      const newPosts = posts.concat(post);

      setPosts(newPosts);
    } catch (e) {
      console.error(e);
    }
  }

  async function deletePost(post) {
    try {
      await PostApi.deletePost(post.id);
      const newPosts = posts.filter((p) => p.id !== post.id);

      setPosts(newPosts);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    PostApi.getAllPosts()
      .then(({ data }) => setPosts(data))
      .catch((err) => console.error(err));
  }, [setPosts]);

  // Components
  const PostsArray = posts.map((post) => (
    <PostCard key={post.id} post={post} onDeleteClick={() => deletePost(post)} />
  ));

  return (

    <div className="feed">
      <Banner/>

      <div className="Feed__postForm-icon">
            <h3>Make your own post</h3>
            <FontAwesomeIcon
              className="postForm-icon"
              icon={["fa", "plus-circle"]}
              onClick={() =>
                toggleForm
                  ? setToggleForm(false)
                  : setToggleForm(true)
              }
            />
          </div>

          {toggleForm && (
        <div className="postForm-container">
            <PostForm onSubmit={(postData) => createPost(postData)}/>
        </div>
      )}
      <div className="Feed__topic-filter">
      <Select className="topic-filter" 
        placeholder= "Filter by topic"
        labelKey="label"
        valueKey="id"
        options={Topics}
        // onChange={(e) => setTopic(e.value)}
        />
        </div>
        <div className="Feed__post-sorter">
      <Select className="post-sorter" 
        placeholder= "Sort by"
        options={sorterOptions}
        // onChange={(e) => setTopic(e.value)}
        />
        </div>


      {PostsArray}
    </div>
  );
}
