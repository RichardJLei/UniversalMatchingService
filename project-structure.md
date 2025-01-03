# UniversalMatching Project Structure

## Backend Structure
backend/
├── shared/                  # Shared utilities and common services
│   ├── middleware/          # Middleware for access control
│   │   ├── auth_middleware.py    # Token validation middleware
│   │   └── access_control.py     # Data filtering based on roles
│   └── utils/               # Shared utility functions
│       └── generate_id.py         # Unique ID generation
├── services/                # Vendor-specific abstraction layers
│   ├── auth_service.py      # Firebase Auth abstraction
│   ├── storage_service.py   # Google Cloud Storage abstraction
│   └── db_service.py        # MongoDB abstraction
├── apps/                    # Feature-specific modules
│   ├── file_management/     # File handling logic
│   │   ├── routes.py        # API routes
│   │   ├── services.py      # Business logic
│   │   └── models.py        # Data models
│   ├── parsing/             # PDF parsing logic
│   │   ├── routes.py
│   │   ├── services.py
│   │   └── models.py
│   ├── comparison/          # JSON comparison logic
│   │   ├── routes.py
│   │   ├── services.py
│   │   └── models.py
│   └── user_management/     # User management logic
│       ├── routes.py
│       ├── services.py
│       └── models.py
├── config/                  # Configuration
│   └── config.py           # App configuration
├── tests/                   # Test files
└── run.py                  # Application entry point

## Frontend Structure
frontend/
├── src/
    ├── shared/             # Shared components and utilities
    │   ├── components/     # Reusable UI components
    │   │   ├── SmartTable.tsx
    │   │   ├── JsonView.tsx
    │   │   └── JsonComparisonView.tsx
    │   ├── contexts/       # React Context providers
    │   │   ├── UserContext.tsx
    │   │   └── DataContext.tsx
    │   └── utils/          # Utility functions
    │       ├── api.ts      # API client
    │       └── auth.ts     # Auth utilities
    ├── apps/               # Feature-specific components
    │   ├── FileManagement/
    │   ├── Parsing/
    │   ├── Comparison/
    │   └── UserManagement/
    ├── layouts/            # Page layouts
    │   └── MainLayout.tsx
    ├── pages/              # Route components
    │   ├── LoginPage.tsx
    │   ├── DashboardPage.tsx
    │   ├── FileManagementPage.tsx
    │   ├── ParsePage.tsx
    │   └── ComparePage.tsx
    ├── config/             # Frontend configuration
    │   └── config.ts
    ├── App.tsx            # Main app component
    └── index.tsx          # Entry point