-- Chess Training Database Schema
-- Generated: 2025-08-30T21:55:05.983Z
-- Tool: Chess Schema Analyzer v1.0.0

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- INDEXES
-- ========================================

\n-- ========================================
-- CONSTRAINTS
-- ========================================

ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);\nALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);\n