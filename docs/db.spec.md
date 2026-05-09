# Database Specification

## Tables

### 1. User

#### Columns

| Name     | Type   | Restrictions                |
| -------- | ------ | --------------------------- |
| username | string | required, 20 characters max |
| fullname | string | required, 40 characters max |
| password | string | required, 60 characters     |
| bio      | string | 100 characters max          |
| image    | string |

### 2. Message

#### Columns

| Name       | Type      | Restrictions         |
| ---------- | --------- | -------------------- |
| content    | string    | 200 characters max   |
| attachment | string    |                      |
| created_at | timestamp | required             |
| updated_at | timestamp |                      |
| sender     | reference | required, user table |
| receiver   | reference | user table           |

### 3. Group

#### Columns

| Name       | Type      | Restrictions                |
| ---------- | --------- | --------------------------- |
| name       | string    | required, 20 characters max |
| info       | string    | 100 characters max          |
| image      | string    |
| created_at | timestamp | required                    |

### 4. Group Member

#### Columns

| Name       | Type      | Restrictions                |
| ---------- | --------- | --------------------------- |
| role       | string    | required, 20 characters max |
| created_at | timestamp | required                    |
| user       | reference | required, user table        |
| group      | reference | required, group table       |

## Relationships

### 1. Sender

- **Parent table:** User
- **Child table:** Message
- **On delete:** cascade

### 2. Receiver

- **Parent table:** User
- **Child table:** Message
- **On delete:** set null

### 3. User

- **Parent table:** User
- **Child table:** Group Member
- **On delete:** cascade

### 4. Group

- **Parent table:** Group
- **Child table:** Group Member
- **On delete:** cascade
