<h1>General Routes</h1>

| HTTP Method  | Route                   | Description                          |
|--------------|-------------------------|--------------------------------------|
|     GET      | `/api/recomendations`   | (API 3s: recomendaciones de cuidades)|
|     GET      | `/api/country-information` | API 3s: info sobre el | 
|     POST     | `/api/signup`           | Crear usuario nuevo                  |
|     POST     | `api/login`             | Iniciar sessión                      |

<h1>Trip Routes</h1>

| HTTP Method  | Route                   | Description                          |
|--------------|-------------------------|--------------------------------------|
|     GET      | `/api/trips`            | Listado de viajes de usuario         |
|     POST     | `/api/trips/add`        | Crear viaje de usuario               |
|     GET      | `/api/trips/:tripID/details`| Detalled de viaje especifico         |
|     PUT      | `/api/trips/:tripID/edit`   | Editar viaje de usuario              |
|    DELETE    | `/api/trips/:tripID/delete` | Elimina un viaje de usuario          |
|     GET      | `/api/savedtrips`           | Destinos apuntados (wishlist)        |
|     POST     | `/api/save-trip/:tripID`    | Añadir destino a favoritos           |
|    DELETE    | `/api/delete-trip/:tripID`  | Eliminar destino de favoritos        |
|     GET      | `/api/last-trips`           | Listado de viajes pasados            |

<h1>Bookings Routes</h1>

| HTTP Method  | Route                     | Description              |
|--------------|---------------------------|--------------------------|
|     GET      | `/api/bookings/`          | Vista de todas reservas  | 
|     POST     | `/api/bookings/add`       | Añadir reservas          |
|     PUT      | `/api/bookings/edit/:idBooking`  | Editar reservas   | 
|     DELETE   | `/api/bookings/delete/:idBooking`| Eliminar reservas | 



<h1>Profile Routes</h1>

| HTTP Method  | Route                     | Description                                          |
|--------------|---------------------------|------------------------------------------------------|
|     GET      | `/api/user`               | Perfil de usuario.                                   | 
|     PUT      | `/api/user/edit`          | Edit Perfil de usuario.                              |
|     POST     | `/api/user/delete`        | Delete Perfil de usuario.                            | 
|     PUT      | `/api/user/add-friend`    | Añadir usuario de lista de amigos                    | 
|     DELETE   | `/api/user/delete-friend` | Eliminar usuario de lista de amigos                  | 
