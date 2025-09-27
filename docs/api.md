# API Reference

This document outlines the API endpoints available in the Art01 platform, including request/response formats and examples.

## Base URL
All endpoints are prefixed with the application's base URL:
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication
Most endpoints require authentication. Include the session token in requests as handled by NextAuth.js. Protected routes will return `401 Unauthorized` if not authenticated.

## Endpoints

### Artists

#### POST /api/artist
Creates a new artist profile.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "handle": "jane_smith_art",
  "bio": "Contemporary abstract painter working with mixed media",
  "contactPref": "email"
}
```

**Response (201 Created):**
```json
{
  "id": "cleqx123456789abcd",
  "name": "Jane Smith",
  "handle": "jane_smith_art",
  "bio": "Contemporary abstract painter working with mixed media",
  "contactPref": "email",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

#### GET /api/artists
Retrieves list of all artists with related data.

**Response (200 OK):**
```json
[
  {
    "id": "cleqx123456789abcd",
    "name": "Jane Smith",
    "handle": "jane_smith_art",
    "bio": "Contemporary abstract painter",
    "contactPref": "email",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "artworks": [...],
    "interactions": [...],
    "assessments": [
      {
        "id": "clr4pnha00009712mn",
        "type": "PHQ-9",
        "score": 12,
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "allocations": [...],
    "siteExports": [...]
  }
]
```

### Interactions

#### POST /api/interaction
Records a volunteer-artist interaction.

**Request Body:**
```json
{
  "artistId": "cleqx123456789abcd",
  "volunteerId": "clm2rzyxw0000456efgh",
  "type": "mentorship",
  "quantity": 2,
  "notes": "Art technique workshop session"
}
```

**Response (201 Created):**
```json
{
  "id": "clp3oszd00006789ijkl",
  "artistId": "cleqx123456789abcd",
  "volunteerId": "clm2rzyxw0000456efgh",
  "type": "mentorship",
  "quantity": 2,
  "money": null,
  "notes": "Art technique workshop session",
  "timestamp": "2024-01-15T14:30:00.000Z",
  "location": null
}
```

### Assessments

#### POST /api/assessment
Creates a mental health assessment entry.

**Request Body:**
```json
{
  "artistId": "cleqx123456789abcd",
  "type": "PHQ-9",
  "answers": "{\"q1\":2,\"q2\":1,\"q3\":3,\"q4\":0,\"q5\":1,\"q6\":0,\"q7\":0,\"q8\":0,\"q9\":0}",
  "score": 7
}
```

**Response (201 Created):**
```json
{
  "id": "clr4pnha00009712mnop",
  "artistId": "cleqx123456789abcd",
  "type": "PHQ-9",
  "score": 7,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Note:** Answers are encrypted before storage and not returned in responses.

### Allocations

#### POST /api/allocation
Records a volunteer allocation of time/money to an artist.

**Request Body:**
```json
{
  "volunteerId": "clm2rzyxw0000456efgh",
  "artistId": "cleqx123456789abcd",
  "timeMinutes": 180,
  "moneyCents": 10000,
  "purpose": "Acrylic paints and canvas purchase"
}
```

**Response (201 Created):**
```json
{
  "id": "cls5iefg00001122qrst",
  "volunteerId": "clm2rzyxw0000456efgh",
  "artistId": "cleqx123456789abcd",
  "timeMinutes": 180,
  "moneyCents": 10000,
  "purpose": "Acrylic paints and canvas purchase",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## Error Responses

### Authentication Error (401)
```json
{
  "error": "Unauthorized"
}
```

### Validation Error (400)
```json
{
  "error": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "number",
      "path": ["name"],
      "message": "Expected string, received number"
    }
  ]
}
```

### Not Found (404)
```json
{
  "error": "Resource not found"
}
```

### Server Error (500)
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- 100 requests per hour for read operations
- 50 requests per hour for write operations
- Rate limit headers included in responses:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## Data Types

### Common Types
- **ID**: CUID string (20+ characters)
- **Timestamp**: ISO 8601 datetime string
- **Money**: Integer cents (e.g., 500 = $5.00)

### Assessment Types
- `"PHQ-9"`: Depression screening
- `"GAD-7"`: Anxiety screening

### Interaction Types
- `"mentorship"`: Teaching/counseling
- `"donation"`: Financial contribution
- `"purchase"`: Art purchase support

### User Roles
- `"volunteer"`: Program volunteer
- `"admin"`: System administrator

## WebSocket Events (Future)

Real-time updates for dashboard:
- `allocation:created`
- `assessment:completed`
- `interaction:recorded`

Event payload includes full object data mirroring REST responses.
