'use client';
import React, { useState, useEffect } from 'react';
import AddEditBlog from './AddEditBlog';

const Listing = () => {
  const [blogs, setBlogs] = useState([]);
  const [filterMyBlogs, setFilterMyBlogs] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allBlogs, setAllBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user);
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setAllBlogs(storedBlogs);
    setBlogs(storedBlogs);
  }, []);

  useEffect(() => {
    if (filterMyBlogs && loggedInUser) {
      setBlogs(allBlogs.filter(blog => blog.userId === loggedInUser));
    } else {
      setBlogs(allBlogs);
    }
  }, [filterMyBlogs, loggedInUser, allBlogs]);

  const handleAddBlog = (updatedBlogs) => {
    setAllBlogs(updatedBlogs);
    setBlogs(updatedBlogs);
    setShowAddEdit(false);
    setFilterMyBlogs(false);
    setEditBlog(null);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  };

  const handleCancel = () => {
    setShowAddEdit(false);
    setEditBlog(null);
  };

  const getFilteredBlogs = () => {
    let filteredResults = [...blogs];

    if (searchTerm.trim() !== '') {
      filteredResults = filteredResults.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredResults;
  };

  const filteredBlogs = getFilteredBlogs();

  const handleDelete = (id) => {
    const updatedAllBlogs = allBlogs.filter(blog => blog.id !== id);
    setAllBlogs(updatedAllBlogs);

    if (filterMyBlogs && loggedInUser) {
      setBlogs(updatedAllBlogs.filter(blog => blog.userId === loggedInUser));
    } else {
      setBlogs(updatedAllBlogs);
    }

    localStorage.setItem('blogs', JSON.stringify(updatedAllBlogs));
  };

  const handleEdit = (blog) => {
    setEditBlog(blog);
    setShowAddEdit(true);
  };

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h2 className="text-primary mb-3">Blog Listings</h2>
          {loggedInUser && <div className="d-flex flex-wrap gap-2 mb-3">
            <button
              className={`btn ${filterMyBlogs ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setFilterMyBlogs(true)}
            >
              My Blogs
            </button>
            <button
              className={`btn ${!filterMyBlogs ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setFilterMyBlogs(false)}
            >
              All Blogs
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                setEditBlog(null);
                setShowAddEdit(true);
              }}
            >
              <i className="bi bi-plus-circle me-1"></i> Add New Blog
            </button>
          </div>}

          <div className="mb-4">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {showAddEdit && (
        <div className="row mb-4">
          <div className="col">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">{editBlog ? "Edit Blog Post" : "Create New Blog Post"}</h4>
              </div>
              <div className="card-body">
                <AddEditBlog
                  loggedInUser={loggedInUser}
                  onAddBlog={handleAddBlog}
                  onCancel={handleCancel}
                  blog={editBlog}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredBlogs.length === 0 ? (
        <div className="alert alert-info">
          No blogs to display.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredBlogs.map(blog => (
            <div className="col" key={blog.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text text-truncate">
                    {blog.content}
                  </p>
                </div>
                <div className="card-footer bg-white">
                  <small className="text-muted">
                    <span className="badge bg-secondary me-2">
                      {blog.author}
                    </span>
                    Published on: {new Date(blog.createdAt).toLocaleDateString()}
                  </small>
                  <div className="mt-2">
                    {loggedInUser === blog.userId && (
                      <>
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() => handleEdit(blog)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(blog.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listing;
