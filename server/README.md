<!-- # Agri Share API

## Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Run `npm run dev` from this folder.

All protected endpoints require `Authorization: Bearer <token>`.

## Endpoints

| Area | Endpoints |
| --- | --- |
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET/PATCH /api/auth/me` |
| Equipment | `GET/POST /api/equipment`, `GET/PATCH/DELETE /api/equipment/:id`, `GET /api/equipment/mine` |
| Maps | `GET /api/equipment/nearby?longitude=88.36&latitude=22.57&distance=25000` |
| Rentals | `POST /api/rentals`, `GET /api/rentals/mine?role=renter|owner|all`, `GET /api/rentals/:id`, `PATCH /api/rentals/:id/status` |

Location data uses GeoJSON, so coordinates must be `[longitude, latitude]`.

### Create equipment example

```json
{
  "name": "Mahindra 575 Tractor",
  "category": "tractor",
  "description": "Well-maintained 45 HP tractor",
  "pricePerDay": 1500,
  "securityDeposit": 5000,
  "location": {
    "coordinates": [88.3639, 22.5726],
    "address": "Kolkata, West Bengal"
  }
}
```

### Rental status lifecycle

`pending → confirmed → active → completed`.

Owners can confirm or reject pending requests; either party can cancel a pending or confirmed booking. The API rejects overlapping pending, confirmed, or active bookings for the same machine. -->
