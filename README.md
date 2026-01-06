# BloodyYue

## Desarrollado por: 
- Jhon Jairo Cordoba Ordoñez
- Desarrollador Web
- cordobaojhonjairo21@gmail.com

## Desarrollado con: 
- Node.js
- Express
- MySQL

## Arquitectura

```
src/
 ├── modules/
 │    ├── auth/
 │    │    ├── auth.controller.js
 │    │    ├── auth.service.js
 │    │    ├── auth.repository.js
 │    │    └── auth.routes.js
 │    │
 │    ├── users/
 │    │    ├── user.controller.js
 │    │    ├── user.service.js
 │    │    ├── user.repository.js
 │    │    └── user.routes.js
 │    │
 │    ├── admin/
 │    │    ├── admin.controller.js
 │    │    ├── admin.service.js
 │    │    └── admin.routes.js
 │    │
 │    ├── settings/
 │    │    ├── settings.controller.js
 │    │    ├── settings.service.js
 │    │    ├── settings.repository.js
 │    │    └── settings.routes.js
 │    │
 │    ├── commissions/
 │    │    ├── commissions.controller.js
 │    │    ├── commissions.service.js
 │    │    ├── commissions.repository.js
 │    │    └── commissions.routes.js
 │    │
 │    ├── cart/
 │    │    ├── cart.controller.js
 │    │    ├── cart.service.js
 │    │    ├── cart.repository.js
 │    │    └── cart.routes.js
 │    │
 │    ├── sales/
 │    │    ├── sales.controller.js
 │    │    ├── sales.service.js
 │    │    ├── sales.repository.js
 │    │    └── sales.routes.js
 │    │
 │    ├── posts/
 │    │    ├── posts.controller.js
 │    │    ├── posts.service.js
 │    │    ├── posts.repository.js
 │    │    └── posts.routes.js
 │    │
 │    ├── chat/
 │    │    ├── chat.controller.js
 │    │    ├── chat.service.js
 │    │    ├── chat.repository.js
 │    │    └── chat.routes.js
 │    │
 │    └── notifications/
 │         ├── notifications.service.js
 │         └── notifications.repository.js
 │
 ├── middlewares/
 ├── config/
 ├── utils/
 ├── app.js
``

## Routes
- auth
    - POST /api/auth/register (name, email, password)
    - POST /api/auth/login (email, password)
    - POST /api/auth/logout
    - POST /api/auth/code (email, type: verify | restartPassword)
    - POST /api/auth/verify (email, code)
    - POST /api/auth/resetPassword (email, password)
    - POST /api/auth/changeRole (userId, rolId)
    - POST /api/auth/refreshToken
    - PATCH /api/auth/changeStatus (userId, status)

- users
    - GET /api/users/me
    - PUT /api/users/me (name, birthday, avatar, poster)
    - GET /api/users/me/testimonies
    - POST /api/users/me/testimonies (message)
    - PUT /api/users/me/testimonies (message)
    - DELETE /api/users/me/testimonies
    - GET /api/users/testimonies

- settings
    - POST /api/settings (title, subtitle, contentHero, email, abaut, work, redes, usagePolicies, seoMeta)
    - GET /api/settings/:id
    - PUT /api/settings/:id (title, subtitle, contentHero, email, abaut, work, redes, usagePolicies)

- media 
    - POST /api/media/images/user (file, context)
    - POST /api/media/images/post (file, context)
    - POST /api/media/shorts/post (file, context)
    - POST /api/media/images/commission (file, context)
    - POST /api/media/images/hero (file, context)


- labels
    - POST /api/labels (name, color)
    - GET /api/labels
    - GET /api/labels/:id
    - PUT /api/labels/:id (name, color)
    - DELETE /api/labels/:id

- posts
    - POST /api/posts (title, description, content, typePost (image, short))
    - GET /api/posts/list/:id
    - GET /api/posts/:id
    - GET /api/posts/filter/label/:labelId
    - GET /api/posts/filter/title/:title
    - PUT /api/posts/:id (title, description)
    - PUT /api/posts/:id/labels (labelIds)
    - DELETE /api/posts/:id
    - GET /api/posts/:id/reactions
    - POST /api/posts/:id/reactions
    - DELETE /api/posts/:id/reactions


- roles
    - POST /api/roles (rol: name, description || rolXPermits: permitId)
    - GET /api/roles
    - GET /api/roles/:rolId
    - GET /api/roles/permits/all
    - POST /api/roles/permits/assign (rolId, permitId)
    - DELETE /api/roles/permits/remove (rolId, permitId)

- commissions
- cart
- sales
- chat
- notifications