Blog API
===
## REST API For Blog

- Author :  ` Redwan Ratu`


## Install & Dependence
- express
- mongoose
- dotenv
- validator
- bcryptjs
- nodemailer
- jsonwebtoken
## Post Model
- Title
- author
- desc
- keyword
- content
- img_Url
- react_users --> id name createdAt 
- meta   --> views reacts comments
- createdAt
- updateAt

## API v1
- Host URL: https://medicine-blog.herokuapp.com

### Example:
`
https://medicine-blog.herokuapp.com/api/v1/posts
`
### Post / Article:
| Method | Api | Description | Remarks |
| ---     | ---   | ---       |  --- |
| GET | [/api/v1/posts]() |  Get all posts |
| POST | [/api/v1/posts]() |    Create Post| 
| GET | [/api/v1/posts/home-short-info]() | Get all posts short info     | Query : page 
| GET | [/api/v1/posts/top-reads]() | Sorting by most Read Post   | Query : page
| GET | [/api/v1/posts/{id}]() | Get Post / Read Post |
| PATCH | [/api/v1/posts/{id}/react]() |  React to a Post  |
| PATCH | [/api/v1/posts/{id}/comment]() |  Commenting on a Post  |

### Tags / Topics:
| Method | Api | Description | Remarks |
| ---     | ---   | ---       |  --- |
| GET | [/api/v1/tags]() | All Tags   | 
| POST | [/api/v1/tags]() | Create Tags   |
| GET | [/api/v1/tags/explore-by]() | Random 5 tags to explore by   | 






