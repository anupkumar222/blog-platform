'use client';
import React, { useState, useEffect } from 'react';

const AddEditBlog = ({ loggedInUser, onAddBlog, onCancel, blog }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || '');
      setContent(blog.content || '');
    }
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];

    if (blog) {
      const updatedBlogs = existingBlogs.map(b =>
        b.id === blog.id
          ? { ...b, title, content }
          : b
      );
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      onAddBlog(updatedBlogs);
    } else {
      const newBlog = {
        id: Date.now().toString(),
        title,
        content,
        author: loggedInUser,
        userId: loggedInUser,
        createdAt: new Date().toISOString(),
      };
      const updatedBlogs = [...existingBlogs, newBlog];
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      onAddBlog(updatedBlogs);
    }

    setTitle('');
    setContent('');
    setValidated(false);
  };

  return (
    <form className={validated ? "was-validated" : ""} noValidate onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingTitle"
              placeholder="Enter blog title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <label htmlFor="floatingTitle">Blog Title</label>
            <div className="invalid-feedback">
              Please provide a title.
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <div className="form-floating">
            <textarea
              className="form-control"
              id="floatingContent"
              placeholder="Write your blog content here"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              style={{ height: '150px' }}
            ></textarea>
            <label htmlFor="floatingContent">Blog Content</label>
            <div className="invalid-feedback">
              Please provide content for your blog.
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col d-flex gap-2">
          <button className="btn btn-primary" type="submit">
            <i className={blog ? "bi bi-pencil-square me-1" : "bi bi-plus-circle me-1"}></i>
            {blog ? "Update Blog" : "Add Blog"}
          </button>
          <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddEditBlog;
