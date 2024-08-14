# Full-Stack-Web-Development

## Backend

This backend is using Node.js, Express.js, and MongoDB. It is a RESTful API that allows users to create, read, update,
and delete posts. The posts are stored in a MongoDB database.

## Database

The database is MongoDB & MySQL

### DSD

<img src="/images/mysql_db_schema.png" height="500">

### Schema

```json
{
  "Articles": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": "string",
      "date": "Date"
    }
  ]
}
```