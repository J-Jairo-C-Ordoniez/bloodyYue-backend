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