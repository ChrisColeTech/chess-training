-- Optimized Chess Training Database Schema
-- Generated: 2025-08-29T00:24:31.588Z
-- Tool: Chess Schema Consolidator v1.0.0
-- Optimized from 419 interfaces to 88 database tables (79% reduction). Eliminated 1 duplicate entities and filtered out UI/configuration interfaces.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- USER DOMAIN (21 tables)
-- ========================================

-- billing_history table
CREATE TABLE billing_history (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(255) NOT NULL,
  status TEXT NOT NULL,
  date INTEGER NOT NULL,
  description VARCHAR(255) NOT NULL,
  invoice_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- payment_method table
CREATE TABLE payment_method (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  type TEXT NOT NULL,
  last_four VARCHAR(255) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  expiry_month INTEGER NOT NULL,
  expiry_year INTEGER NOT NULL,
  is_default BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- user_progress_data table
CREATE TABLE user_progress_data (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  current_performance_level TEXT NOT NULL,
  performance_value INTEGER NOT NULL,
  progress_metrics JSONB NOT NULL,
  achievements JSONB NOT NULL,
  last_activity VARCHAR(255) NOT NULL,
  progress_history JSONB NOT NULL,
  created_at VARCHAR(255) NOT NULL,
  updated_at VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE user_progress_data ADD FOREIGN KEY (user_id) REFERENCES users (id);

-- progress_snapshot table
CREATE TABLE progress_snapshot (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  date VARCHAR(255) NOT NULL,
  performance_value INTEGER NOT NULL,
  tactical_rating INTEGER NOT NULL,
  puzzles_solved INTEGER NOT NULL,
  study_streak INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- user_puzzle_selection table
CREATE TABLE user_puzzle_selection (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  selection_history JSONB NOT NULL,
  favorite_themes JSONB NOT NULL,
  blacklisted_themes JSONB NOT NULL,
  preferred_time_control TEXT NOT NULL,
  difficulty_progression JSONB NOT NULL,
  custom_filters JSONB NOT NULL,
  selection_algorithm TEXT NOT NULL,
  created_at VARCHAR(255) NOT NULL,
  updated_at VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE user_puzzle_selection ADD FOREIGN KEY (user_id) REFERENCES users (id);

-- puzzle_selection_entry table
CREATE TABLE puzzle_selection_entry (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  timestamp VARCHAR(255) NOT NULL,
  puzzle_id UUID NOT NULL,
  selection_reason VARCHAR(255) NOT NULL,
  user_rating INTEGER NOT NULL,
  puzzle_rating INTEGER NOT NULL,
  theme VARCHAR(255) NOT NULL,
  difficulty VARCHAR(255) NOT NULL,
  was_skipped BOOLEAN NOT NULL,
  performance INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE puzzle_selection_entry ADD FOREIGN KEY (puzzle_id) REFERENCES puzzles (id);

-- user_puzzle_session table
CREATE TABLE user_puzzle_session (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  user_id UUID NOT NULL,
  start_time VARCHAR(255) NOT NULL,
  end_time VARCHAR(255),
  puzzles_solved INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_time INTEGER NOT NULL,
  average_time INTEGER NOT NULL,
  selected_difficulties JSONB NOT NULL,
  selected_themes JSONB NOT NULL,
  session_type TEXT NOT NULL,
  results JSONB NOT NULL,
  session_stats JSONB NOT NULL,
  created_at VARCHAR(255) NOT NULL,
  updated_at VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE user_puzzle_session ADD FOREIGN KEY (session_id) REFERENCES sessions (id);
ALTER TABLE user_puzzle_session ADD FOREIGN KEY (user_id) REFERENCES users (id);

-- puzzle_result table
CREATE TABLE puzzle_result (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  puzzle_id UUID NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_spent INTEGER NOT NULL,
  hints_used INTEGER NOT NULL,
  attempts INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  theme VARCHAR(255) NOT NULL,
  difficulty VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE puzzle_result ADD FOREIGN KEY (puzzle_id) REFERENCES puzzles (id);

-- user_puzzle_stats table
CREATE TABLE user_puzzle_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  total_attempts INTEGER NOT NULL,
  correct_solutions INTEGER NOT NULL,
  average_rating INTEGER NOT NULL,
  current_streak INTEGER NOT NULL,
  longest_streak INTEGER NOT NULL,
  average_time INTEGER NOT NULL,
  category_stats JSONB NOT NULL,
  difficulty_stats JSONB NOT NULL,
  recent_sessions JSONB NOT NULL,
  created_at VARCHAR(255) NOT NULL,
  updated_at VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE user_puzzle_stats ADD FOREIGN KEY (user_id) REFERENCES users (id);

-- puzzle_session table
CREATE TABLE puzzle_session (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  date VARCHAR(255) NOT NULL,
  puzzles_solved INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_time INTEGER NOT NULL,
  average_rating INTEGER NOT NULL,
  themes JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE puzzle_session ADD FOREIGN KEY (session_id) REFERENCES sessions (id);

-- user_study_plan table
CREATE TABLE user_study_plan (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  user_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  goals JSONB NOT NULL,
  target_rating INTEGER NOT NULL,
  estimated_weeks INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL,
  progress JSONB NOT NULL,
  modules JSONB NOT NULL,
  created_at VARCHAR(255) NOT NULL,
  updated_at VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE user_study_plan ADD FOREIGN KEY (user_id) REFERENCES users (id);

-- study_module table
CREATE TABLE study_module (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  estimated_hours INTEGER NOT NULL,
  is_completed BOOLEAN NOT NULL,
  completed_at VARCHAR(255),
  topics JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- study_topic table
CREATE TABLE study_topic (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  type TEXT NOT NULL,
  is_completed BOOLEAN NOT NULL,
  completed_at VARCHAR(255),
  notes VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- user_profile table
CREATE TABLE user_profile (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255),
  bio VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  birth_date VARCHAR(255) NOT NULL,
  profile_visibility TEXT NOT NULL,
  avatar_url VARCHAR(255),
  ratings INTEGER NOT NULL,
  fide_rating INTEGER,
  timezone VARCHAR(255) NOT NULL,
  language VARCHAR(255) NOT NULL,
  title TEXT,
  verification_badges JSONB NOT NULL,
  social_links JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- login_session table
CREATE TABLE login_session (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  timestamp INTEGER NOT NULL,
  ip_address VARCHAR(255) NOT NULL,
  location JSONB NOT NULL,
  device JSONB NOT NULL,
  status TEXT NOT NULL,
  last_activity INTEGER NOT NULL,
  flags JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE login_session ADD FOREIGN KEY (session_id) REFERENCES sessions (id);

-- user_account table
CREATE TABLE user_account (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL,
  created_at INTEGER NOT NULL,
  last_login_at INTEGER NOT NULL,
  status TEXT NOT NULL,
  verification_level TEXT NOT NULL,
  profile TEXT NOT NULL,
  security TEXT NOT NULL,
  subscription TEXT NOT NULL,
  connected_services JSONB NOT NULL,
  privacy TEXT NOT NULL,
  badges TEXT NOT NULL,
  login_history JSONB NOT NULL,
  data_exports JSONB NOT NULL,
  deletion_request TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE user_account ADD FOREIGN KEY (account_id) REFERENCES accounts (id);

-- user_progress table
CREATE TABLE user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  articles_read JSONB NOT NULL,
  tutorials_completed JSONB NOT NULL,
  bookmarks JSONB NOT NULL,
  recent_searches JSONB NOT NULL,
  feedback_given VARCHAR(255) NOT NULL,
  stats JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- user_opening_data table
CREATE TABLE user_opening_data (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  favorites JSONB NOT NULL,
  recently_studied JSONB NOT NULL,
  study_progress JSONB NOT NULL,
  repertoire JSONB NOT NULL,
  performance JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- profile_user table
CREATE TABLE profile_user (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  skill_level TEXT NOT NULL,
  join_date VARCHAR(255) NOT NULL,
  current_rating INTEGER NOT NULL,
  peak_rating INTEGER NOT NULL,
  rating_change INTEGER NOT NULL,
  games_played INTEGER NOT NULL,
  puzzles_solved INTEGER NOT NULL,
  study_hours INTEGER NOT NULL,
  win_rate INTEGER NOT NULL,
  current_streak INTEGER NOT NULL,
  longest_streak INTEGER NOT NULL,
  favorite_opening VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- achievement table
CREATE TABLE achievement (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  icon VARCHAR(255) NOT NULL,
  unlocked BOOLEAN NOT NULL,
  progress INTEGER NOT NULL,
  total INTEGER NOT NULL,
  rarity TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- use_reset_password_return table
CREATE TABLE use_reset_password_return (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  form_state TEXT NOT NULL,
  password_value VARCHAR(255) NOT NULL,
  form TEXT NOT NULL,
  handle_submit TEXT NOT NULL,
  handle_toggle_password VARCHAR(255) NOT NULL,
  handle_toggle_confirm_password VARCHAR(255) NOT NULL,
  handle_back_to_login TEXT NOT NULL,
  handle_request_new_link TEXT NOT NULL,
  handle_continue_to_login TEXT NOT NULL,
  password_requirements VARCHAR(255) NOT NULL,
  clear_error TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- ========================================
-- PUZZLE DOMAIN (28 tables)
-- ========================================

-- puzzle table
CREATE TABLE puzzle (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  fen VARCHAR(255) NOT NULL,
  solution JSONB NOT NULL,
  endgame_type VARCHAR(255) NOT NULL,
  difficulty TEXT NOT NULL,
  rating INTEGER NOT NULL,
  moves INTEGER NOT NULL,
  description VARCHAR(255) NOT NULL,
  theory VARCHAR(255) NOT NULL,
  hint1 VARCHAR(255) NOT NULL,
  hint2 VARCHAR(255) NOT NULL,
  hint3 VARCHAR(255) NOT NULL,
  theme VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- endgame_category table
CREATE TABLE endgame_category (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  puzzles INTEGER NOT NULL,
  completed INTEGER NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- progress_statistic table
CREATE TABLE progress_statistic (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  value VARCHAR(255) NOT NULL,
  label VARCHAR(255) NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- puzzle_source_metadata table
CREATE TABLE puzzle_source_metadata (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  source_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  total_puzzles INTEGER NOT NULL,
  average_rating INTEGER NOT NULL,
  categories JSONB NOT NULL,
  is_active BOOLEAN NOT NULL,
  last_updated VARCHAR(255) NOT NULL,
  import_date VARCHAR(255) NOT NULL,
  attribution JSONB NOT NULL,
  statistics JSONB NOT NULL,
  created_at VARCHAR(255) NOT NULL,
  updated_at VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE puzzle_source_metadata ADD FOREIGN KEY (source_id) REFERENCES sources (id);

-- puzzle_source_mapping table
CREATE TABLE puzzle_source_mapping (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  label VARCHAR(255) NOT NULL,
  icon VARCHAR(255) NOT NULL,
  short_icon VARCHAR(255) NOT NULL,
  color VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- custom_puzzle table
CREATE TABLE custom_puzzle (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  fen VARCHAR(255) NOT NULL,
  solution JSONB NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  theme VARCHAR(255) NOT NULL,
  difficulty TEXT NOT NULL,
  rating INTEGER NOT NULL,
  moves INTEGER NOT NULL,
  tags JSONB NOT NULL,
  source TEXT NOT NULL,
  author JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  attempt_count INTEGER NOT NULL,
  success_rate INTEGER NOT NULL,
  average_time INTEGER NOT NULL,
  collection_id UUID,
  hint1 VARCHAR(255) NOT NULL,
  hint2 VARCHAR(255) NOT NULL,
  hint3 VARCHAR(255) NOT NULL,
  notes VARCHAR(255),
  is_featured BOOLEAN NOT NULL,
  is_bookmarked BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE custom_puzzle ADD FOREIGN KEY (collection_id) REFERENCES collections (id);

-- custom_puzzle_collection table
CREATE TABLE custom_puzzle_collection (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  visibility TEXT NOT NULL,
  puzzle_ids JSONB NOT NULL,
  author JSONB NOT NULL,
  tags JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  access_count INTEGER NOT NULL,
  average_rating INTEGER NOT NULL,
  thumbnail VARCHAR(255),
  is_featured BOOLEAN NOT NULL,
  is_bookmarked BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- custom_puzzle_session table
CREATE TABLE custom_puzzle_session (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  current_puzzle_index INTEGER NOT NULL,
  board_position VARCHAR(255) NOT NULL,
  move_count INTEGER NOT NULL,
  hints_used INTEGER NOT NULL,
  status TEXT NOT NULL,
  time_elapsed INTEGER NOT NULL,
  is_timer_active BOOLEAN NOT NULL,
  user_moves JSONB NOT NULL,
  active_tab TEXT NOT NULL,
  current_collection TEXT,
  filters JSONB NOT NULL,
  search_query VARCHAR(255) NOT NULL,
  sort_by TEXT NOT NULL,
  sort_order TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- custom_puzzle_filters table
CREATE TABLE custom_puzzle_filters (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  difficulty JSONB,
  themes JSONB,
  rating INTEGER,
  source JSONB,
  tags JSONB,
  collections JSONB,
  author VARCHAR(255),
  date_range JSONB,
  min_success_rate INTEGER,
  bookmarked_only BOOLEAN,
  featured_only BOOLEAN,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- custom_puzzle_search_result table
CREATE TABLE custom_puzzle_search_result (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  puzzles JSONB NOT NULL,
  total_count INTEGER NOT NULL,
  current_page INTEGER NOT NULL,
  total_pages INTEGER NOT NULL,
  applied_filters TEXT NOT NULL,
  search_query VARCHAR(255) NOT NULL,
  execution_time INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- custom_puzzle_form_data table
CREATE TABLE custom_puzzle_form_data (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  fen VARCHAR(255) NOT NULL,
  solution JSONB NOT NULL,
  theme VARCHAR(255) NOT NULL,
  difficulty TEXT NOT NULL,
  tags JSONB NOT NULL,
  hint1 VARCHAR(255) NOT NULL,
  hint2 VARCHAR(255) NOT NULL,
  hint3 VARCHAR(255) NOT NULL,
  notes VARCHAR(255),
  collection_id UUID,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE custom_puzzle_form_data ADD FOREIGN KEY (collection_id) REFERENCES collections (id);

-- endgame_category_info table
CREATE TABLE endgame_category_info (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  count INTEGER NOT NULL,
  icon VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL,
  difficulty_range JSONB NOT NULL,
  total_study_time INTEGER NOT NULL,
  is_unlocked BOOLEAN NOT NULL,
  progress INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- endgame_analysis table
CREATE TABLE endgame_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  position VARCHAR(255) NOT NULL,
  evaluation INTEGER NOT NULL,
  best_moves JSONB NOT NULL,
  principal_variation JSONB NOT NULL,
  tactical_themes JSONB NOT NULL,
  strategic_concepts JSONB NOT NULL,
  key_squares JSONB NOT NULL,
  critical_lines JSONB NOT NULL,
  classification JSONB NOT NULL,
  historical_notes VARCHAR(255),
  depth INTEGER NOT NULL,
  timestamp INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- study_progress table
CREATE TABLE study_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  position_id UUID NOT NULL,
  sessions_completed INTEGER NOT NULL,
  total_study_time INTEGER NOT NULL,
  mastery_level INTEGER NOT NULL,
  last_studied INTEGER NOT NULL,
  practice_stats JSONB NOT NULL,
  moves_practiced JSONB NOT NULL,
  variations_mastered JSONB NOT NULL,
  notes VARCHAR(255) NOT NULL,
  is_bookmarked BOOLEAN NOT NULL,
  rating INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE study_progress ADD FOREIGN KEY (position_id) REFERENCES positions (id);

-- practice_session table
CREATE TABLE practice_session (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  position TEXT NOT NULL,
  type TEXT NOT NULL,
  settings JSONB NOT NULL,
  game_state JSONB,
  start_time INTEGER NOT NULL,
  end_time INTEGER,
  result JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- endgame_composition table
CREATE TABLE endgame_composition (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  composer VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  fen VARCHAR(255) NOT NULL,
  stipulation VARCHAR(255) NOT NULL,
  solution JSONB NOT NULL,
  artistic_value INTEGER NOT NULL,
  solving_difficulty TEXT NOT NULL,
  themes JSONB NOT NULL,
  source VARCHAR(255),
  award VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- endgame_library_filters table
CREATE TABLE endgame_library_filters (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  category TEXT,
  difficulty_range JSONB,
  study_time_range JSONB,
  win_rate_range JSONB,
  include_tags JSONB,
  exclude_tags JSONB,
  unlocked_only BOOLEAN,
  studied_only BOOLEAN,
  search_text VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- endgame_library_stats table
CREATE TABLE endgame_library_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  total_positions INTEGER NOT NULL,
  studied_positions INTEGER NOT NULL,
  average_mastery INTEGER NOT NULL,
  total_study_time INTEGER NOT NULL,
  positions_by_difficulty INTEGER NOT NULL,
  positions_by_category INTEGER NOT NULL,
  study_streak INTEGER NOT NULL,
  favorite_category TEXT NOT NULL,
  recent_positions JSONB NOT NULL,
  bookmarked_positions JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- endgame_analysis table
CREATE TABLE endgame_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  type VARCHAR(255) NOT NULL,
  material_balance JSONB NOT NULL,
  theoretical_result TEXT NOT NULL,
  key_squares JSONB NOT NULL,
  technique VARCHAR(255) NOT NULL,
  critical_moments JSONB NOT NULL,
  tablebase_result TEXT,
  distance_to_goal INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- game_collection table
CREATE TABLE game_collection (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  game_ids JSONB NOT NULL,
  tags JSONB NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  stats JSONB NOT NULL,
  sharing JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- puzzle_session table
CREATE TABLE puzzle_session (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  current_puzzle_index INTEGER NOT NULL,
  board_position VARCHAR(255) NOT NULL,
  move_count INTEGER NOT NULL,
  hints_used INTEGER NOT NULL,
  status TEXT NOT NULL,
  time_elapsed INTEGER NOT NULL,
  is_timer_active BOOLEAN NOT NULL,
  user_moves JSONB NOT NULL,
  active_tab TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- puzzle_category table
CREATE TABLE puzzle_category (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  icon VARCHAR(255) NOT NULL,
  route VARCHAR(255) NOT NULL,
  difficulty JSONB NOT NULL,
  total_puzzles INTEGER NOT NULL,
  completed_puzzles INTEGER NOT NULL,
  average_rating INTEGER NOT NULL,
  personal_best INTEGER NOT NULL,
  last_played TIMESTAMP,
  achievements JSONB NOT NULL,
  color VARCHAR(255) NOT NULL,
  gradient VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- puzzle_difficulty table
CREATE TABLE puzzle_difficulty (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  level TEXT NOT NULL,
  rating INTEGER NOT NULL,
  puzzle_count INTEGER NOT NULL,
  completed INTEGER NOT NULL,
  accuracy INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- puzzle_stats table
CREATE TABLE puzzle_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  total_puzzles_completed INTEGER NOT NULL,
  current_rating INTEGER NOT NULL,
  weekly_progress INTEGER NOT NULL,
  average_accuracy INTEGER NOT NULL,
  time_spent INTEGER NOT NULL,
  favorite_category VARCHAR(255) NOT NULL,
  current_streak INTEGER NOT NULL,
  best_streak INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- recent_puzzle table
CREATE TABLE recent_puzzle (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  difficulty VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL,
  completed BOOLEAN NOT NULL,
  accuracy INTEGER,
  time_spent INTEGER,
  date TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- achievement table
CREATE TABLE achievement (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  icon VARCHAR(255) NOT NULL,
  unlocked BOOLEAN NOT NULL,
  unlocked_date TIMESTAMP,
  rarity TEXT NOT NULL,
  progress INTEGER,
  max_progress INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- puzzle_selection_filters table
CREATE TABLE puzzle_selection_filters (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  difficulty JSONB NOT NULL,
  categories JSONB NOT NULL,
  sort_by TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- custom_study_plan table
CREATE TABLE custom_study_plan (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  selected_lessons JSONB NOT NULL,
  schedule TEXT NOT NULL,
  goals JSONB NOT NULL,
  created_at INTEGER NOT NULL,
  modified_at INTEGER NOT NULL,
  progress JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- ========================================
-- GAME DOMAIN (14 tables)
-- ========================================

-- game_filter table
CREATE TABLE game_filter (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  source JSONB,
  result JSONB,
  opponent JSONB,
  date_range JSONB,
  min_accuracy INTEGER,
  max_accuracy INTEGER,
  openings JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- game_phase_analysis table
CREATE TABLE game_phase_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  opening JSONB NOT NULL,
  middlegame JSONB NOT NULL,
  endgame JSONB NOT NULL,
  transitions JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- game_import table
CREATE TABLE game_import (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  game_data VARCHAR(255) NOT NULL,
  imported_at INTEGER NOT NULL,
  metadata JSONB NOT NULL,
  validation JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- review_session table
CREATE TABLE review_session (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  current_game TEXT NOT NULL,
  current_move_index INTEGER NOT NULL,
  board_orientation TEXT NOT NULL,
  view_mode TEXT NOT NULL,
  filters JSONB NOT NULL,
  comparison_game TEXT,
  training_mode JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- game_review_service table
CREATE TABLE game_review_service (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  import_from_p_g_n VARCHAR(255) NOT NULL,
  import_from_chess_com JSONB NOT NULL,
  import_from_lichess JSONB NOT NULL,
  analyze_game TEXT NOT NULL,
  export_game VARCHAR(255) NOT NULL,
  save_review TEXT NOT NULL,
  load_reviews JSONB NOT NULL,
  delete_review VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- game_analysis table
CREATE TABLE game_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  quality INTEGER NOT NULL,
  phases JSONB NOT NULL,
  strategic_themes JSONB NOT NULL,
  tactical_themes JSONB NOT NULL,
  educational_value INTEGER NOT NULL,
  learning_objectives JSONB NOT NULL,
  study_recommendations JSONB NOT NULL,
  historical_significance VARCHAR(255),
  quotes JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- game_filters table
CREATE TABLE game_filters (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  search_term VARCHAR(255) NOT NULL,
  players JSONB NOT NULL,
  tournament_types JSONB NOT NULL,
  opening_categories JSONB NOT NULL,
  eco_codes JSONB NOT NULL,
  results JSONB NOT NULL,
  year_range JSONB NOT NULL,
  rating_range INTEGER NOT NULL,
  quality_range JSONB NOT NULL,
  themes JSONB NOT NULL,
  bookmarked_only BOOLEAN NOT NULL,
  sort_by TEXT NOT NULL,
  sort_order TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- study_session table
CREATE TABLE study_session (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  game_id UUID NOT NULL,
  start_time INTEGER NOT NULL,
  end_time INTEGER,
  moves_studied JSONB NOT NULL,
  time_per_move INTEGER NOT NULL,
  analysis_attempts JSONB NOT NULL,
  notes VARCHAR(255) NOT NULL,
  rating INTEGER,
  concepts_learned JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE study_session ADD FOREIGN KEY (game_id) REFERENCES games (id);

-- game_search_result table
CREATE TABLE game_search_result (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  games JSONB NOT NULL,
  total_count INTEGER NOT NULL,
  suggestions JSONB,
  filter_suggestions JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- master_game table
CREATE TABLE master_game (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  white VARCHAR(255) NOT NULL,
  black VARCHAR(255) NOT NULL,
  white_rating INTEGER,
  black_rating INTEGER,
  result TEXT NOT NULL,
  year INTEGER NOT NULL,
  event VARCHAR(255) NOT NULL,
  avg_rating INTEGER NOT NULL,
  moves INTEGER NOT NULL,
  date VARCHAR(255),
  round VARCHAR(255),
  significance VARCHAR(255),
  game_url VARCHAR(255),
  pgn VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- game_setup table
CREATE TABLE game_setup (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  opponent TEXT NOT NULL,
  player_color TEXT NOT NULL,
  time_control TEXT NOT NULL,
  use_opening_book BOOLEAN NOT NULL,
  enable_sounds BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- game_state table
CREATE TABLE game_state (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL,
  setup TEXT NOT NULL,
  position VARCHAR(255) NOT NULL,
  moves JSONB NOT NULL,
  status TEXT NOT NULL,
  result TEXT NOT NULL,
  current_turn TEXT NOT NULL,
  time_remaining JSONB NOT NULL,
  in_check BOOLEAN NOT NULL,
  legal_moves JSONB NOT NULL,
  start_time INTEGER NOT NULL,
  end_time INTEGER,
  last_move TEXT,
  ai_thinking BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE game_state ADD FOREIGN KEY (game_id) REFERENCES games (id);

-- game_analysis table
CREATE TABLE game_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  evaluation INTEGER NOT NULL,
  best_moves JSONB NOT NULL,
  position_analysis JSONB NOT NULL,
  tactical_themes JSONB NOT NULL,
  opening JSONB NOT NULL,
  endgame JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- tutorial_mini_game table
CREATE TABLE tutorial_mini_game (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  type TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  config JSONB NOT NULL,
  scoring JSONB NOT NULL,
  instructions JSONB NOT NULL,
  success_criteria JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- ========================================
-- LEARNING DOMAIN (7 tables)
-- ========================================

-- related_tutorial table
CREATE TABLE related_tutorial (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  duration VARCHAR(255) NOT NULL,
  thumbnail VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- study_session_plan table
CREATE TABLE study_session_plan (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  planned_start_time INTEGER NOT NULL,
  estimated_duration INTEGER NOT NULL,
  intensity TEXT NOT NULL,
  planned_content JSONB NOT NULL,
  goals JSONB NOT NULL,
  prerequisites JSONB NOT NULL,
  success_metrics JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- achievement_badge table
CREATE TABLE achievement_badge (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  type TEXT NOT NULL,
  icon VARCHAR(255) NOT NULL,
  criteria JSONB NOT NULL,
  rarity INTEGER NOT NULL,
  is_earned BOOLEAN NOT NULL,
  earned_at INTEGER,
  xp_reward INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- study_progress table
CREATE TABLE study_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  total_study_time INTEGER NOT NULL,
  current_streak INTEGER NOT NULL,
  longest_streak INTEGER NOT NULL,
  total_x_p INTEGER NOT NULL,
  level INTEGER NOT NULL,
  xp_to_next_level INTEGER NOT NULL,
  path_progress JSONB NOT NULL,
  achievements JSONB NOT NULL,
  stats JSONB NOT NULL,
  schedule TEXT,
  recent_sessions JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE study_progress ADD FOREIGN KEY (user_id) REFERENCES users (id);

-- study_session table
CREATE TABLE study_session (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  start_time INTEGER NOT NULL,
  end_time INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  content_studied JSONB NOT NULL,
  xp_earned INTEGER NOT NULL,
  performance JSONB NOT NULL,
  notes VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- tutorial_progress table
CREATE TABLE tutorial_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  tutorial_id UUID NOT NULL,
  status TEXT NOT NULL,
  current_step_index INTEGER NOT NULL,
  completed_steps JSONB NOT NULL,
  skipped_steps JSONB NOT NULL,
  progress_percentage INTEGER NOT NULL,
  time_spent INTEGER NOT NULL,
  started_at INTEGER,
  last_accessed_at INTEGER NOT NULL,
  completed_at INTEGER,
  user_rating INTEGER,
  user_feedback VARCHAR(255),
  restart_count INTEGER NOT NULL,
  quiz_scores INTEGER,
  notes VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE tutorial_progress ADD FOREIGN KEY (tutorial_id) REFERENCES tutorials (id);

-- tutorial_achievement table
CREATE TABLE tutorial_achievement (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  icon VARCHAR(255) NOT NULL,
  tier TEXT NOT NULL,
  points INTEGER NOT NULL,
  requirements JSONB NOT NULL,
  is_unlocked BOOLEAN NOT NULL,
  unlocked_at INTEGER,
  rarity INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- ========================================
-- PROGRESS DOMAIN (13 tables)
-- ========================================

-- import_progress table
CREATE TABLE import_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  status TEXT NOT NULL,
  current INTEGER NOT NULL,
  total INTEGER NOT NULL,
  message VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- achievement_unlock_condition table
CREATE TABLE achievement_unlock_condition (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  target INTEGER NOT NULL,
  current INTEGER,
  description VARCHAR(255) NOT NULL,
  required_achievements JSONB,
  time_frame TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- achievement_reward table
CREATE TABLE achievement_reward (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  xp INTEGER NOT NULL,
  badge VARCHAR(255),
  title VARCHAR(255),
  unlocks JSONB,
  coins INTEGER,
  description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- achievement_series table
CREATE TABLE achievement_series (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  icon VARCHAR(255) NOT NULL,
  achievement_ids JSONB NOT NULL,
  total_count INTEGER NOT NULL,
  completed_count INTEGER NOT NULL,
  progress INTEGER NOT NULL,
  series_reward TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- achievement_stats table
CREATE TABLE achievement_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  total_achievements INTEGER NOT NULL,
  completed_achievements INTEGER NOT NULL,
  completion_rate INTEGER NOT NULL,
  total_xp_earned INTEGER NOT NULL,
  by_rarity JSONB NOT NULL,
  by_category JSONB NOT NULL,
  recently_earned JSONB NOT NULL,
  near_completion JSONB NOT NULL,
  current_streak INTEGER NOT NULL,
  longest_streak INTEGER NOT NULL,
  average_difficulty INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- achievement_filters table
CREATE TABLE achievement_filters (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  categories JSONB NOT NULL,
  rarities JSONB NOT NULL,
  statuses JSONB NOT NULL,
  earned_only BOOLEAN NOT NULL,
  available_only BOOLEAN NOT NULL,
  secret_only BOOLEAN NOT NULL,
  search_text VARCHAR(255) NOT NULL,
  sort_by TEXT NOT NULL,
  sort_direction TEXT NOT NULL,
  difficulty_range INTEGER NOT NULL,
  series_filter VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- achievement_share table
CREATE TABLE achievement_share (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  achievement TEXT NOT NULL,
  shared_at TIMESTAMP NOT NULL,
  message VARCHAR(255),
  platform TEXT NOT NULL,
  reactions INTEGER NOT NULL,
  comments JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- achievement_leaderboard_entry table
CREATE TABLE achievement_leaderboard_entry (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  username VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  total_achievements INTEGER NOT NULL,
  completion_rate INTEGER NOT NULL,
  total_xp INTEGER NOT NULL,
  rarest_achievement TEXT,
  latest_achievement TEXT,
  rank INTEGER NOT NULL,
  previous_rank INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE achievement_leaderboard_entry ADD FOREIGN KEY (user_id) REFERENCES users (id);

-- achievement_notification table
CREATE TABLE achievement_notification (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  achievement TEXT NOT NULL,
  earned_at TIMESTAMP NOT NULL,
  is_read BOOLEAN NOT NULL,
  is_dismissed BOOLEAN NOT NULL,
  is_animating BOOLEAN,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- training_session table
CREATE TABLE training_session (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  type TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  duration INTEGER NOT NULL,
  score INTEGER NOT NULL,
  timestamp INTEGER NOT NULL,
  xp_gained INTEGER NOT NULL,
  accuracy INTEGER,
  rating_change INTEGER,
  metadata JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- achievement table
CREATE TABLE achievement (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  icon TEXT NOT NULL,
  status TEXT NOT NULL,
  progress INTEGER NOT NULL,
  target INTEGER NOT NULL,
  xp_reward INTEGER NOT NULL,
  category TEXT NOT NULL,
  rarity TEXT NOT NULL,
  requirements JSONB,
  badge_color VARCHAR(255) NOT NULL,
  completed_at INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- skill_progression table
CREATE TABLE skill_progression (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  level INTEGER NOT NULL,
  progress INTEGER NOT NULL,
  xp INTEGER NOT NULL,
  xp_to_next INTEGER NOT NULL,
  improvement INTEGER NOT NULL,
  color VARCHAR(255) NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- goal table
CREATE TABLE goal (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  target INTEGER NOT NULL,
  progress INTEGER NOT NULL,
  target_date INTEGER NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL,
  status TEXT NOT NULL,
  icon TEXT NOT NULL,
  color VARCHAR(255) NOT NULL,
  created_at INTEGER NOT NULL,
  completed_at INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- ========================================
-- SYSTEM DOMAIN (5 tables)
-- ========================================

-- sound_effect table
CREATE TABLE sound_effect (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- nav_item table
CREATE TABLE nav_item (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  icon TEXT NOT NULL,
  path VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- piece_set_info table
CREATE TABLE piece_set_info (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  preview VARCHAR(255) NOT NULL,
  category TEXT NOT NULL,
  is_premium BOOLEAN NOT NULL,
  author VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- notification_instance table
CREATE TABLE notification_instance (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  event_type TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message VARCHAR(255) NOT NULL,
  priority TEXT NOT NULL,
  status TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  sent_channels JSONB NOT NULL,
  data VARCHAR(255),
  actions JSONB,
  expires_at INTEGER,
  is_grouped BOOLEAN,
  group_id UUID,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
ALTER TABLE notification_instance ADD FOREIGN KEY (group_id) REFERENCES groups (id);

-- notification_rule table
CREATE TABLE notification_rule (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  enabled BOOLEAN NOT NULL,
  conditions JSONB NOT NULL,
  actions JSONB NOT NULL,
  cooldown_minutes INTEGER NOT NULL,
  max_triggers_per_day INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  last_triggered INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- ========================================
-- INDEXES
-- ========================================

CREATE INDEX idx_billing_history_created_at ON billing_history (created_at);
CREATE INDEX idx_payment_method_created_at ON payment_method (created_at);
CREATE INDEX idx_user_progress_data_user_id ON user_progress_data (user_id);
CREATE INDEX idx_user_progress_data_created_at ON user_progress_data (created_at);
CREATE INDEX idx_user_progress_data_created_at ON user_progress_data (created_at);
CREATE INDEX idx_progress_snapshot_tactical_rating ON progress_snapshot (tactical_rating);
CREATE INDEX idx_progress_snapshot_created_at ON progress_snapshot (created_at);
CREATE INDEX idx_user_puzzle_selection_user_id ON user_puzzle_selection (user_id);
CREATE INDEX idx_user_puzzle_selection_created_at ON user_puzzle_selection (created_at);
CREATE INDEX idx_user_puzzle_selection_created_at ON user_puzzle_selection (created_at);
CREATE INDEX idx_puzzle_selection_entry_puzzle_id ON puzzle_selection_entry (puzzle_id);
CREATE INDEX idx_puzzle_selection_entry_user_rating ON puzzle_selection_entry (user_rating);
CREATE INDEX idx_puzzle_selection_entry_puzzle_rating ON puzzle_selection_entry (puzzle_rating);
CREATE INDEX idx_puzzle_selection_entry_created_at ON puzzle_selection_entry (created_at);
CREATE INDEX idx_user_puzzle_session_session_id ON user_puzzle_session (session_id);
CREATE INDEX idx_user_puzzle_session_user_id ON user_puzzle_session (user_id);
CREATE INDEX idx_user_puzzle_session_created_at ON user_puzzle_session (created_at);
CREATE INDEX idx_user_puzzle_session_created_at ON user_puzzle_session (created_at);
CREATE INDEX idx_puzzle_result_puzzle_id ON puzzle_result (puzzle_id);
CREATE INDEX idx_puzzle_result_rating ON puzzle_result (rating);
CREATE INDEX idx_puzzle_result_created_at ON puzzle_result (created_at);
CREATE INDEX idx_user_puzzle_stats_user_id ON user_puzzle_stats (user_id);
CREATE INDEX idx_user_puzzle_stats_average_rating ON user_puzzle_stats (average_rating);
CREATE INDEX idx_user_puzzle_stats_created_at ON user_puzzle_stats (created_at);
CREATE INDEX idx_user_puzzle_stats_created_at ON user_puzzle_stats (created_at);
CREATE INDEX idx_puzzle_session_session_id ON puzzle_session (session_id);
CREATE INDEX idx_puzzle_session_average_rating ON puzzle_session (average_rating);
CREATE INDEX idx_puzzle_session_created_at ON puzzle_session (created_at);
CREATE INDEX idx_user_study_plan_user_id ON user_study_plan (user_id);
CREATE INDEX idx_user_study_plan_target_rating ON user_study_plan (target_rating);
CREATE INDEX idx_user_study_plan_created_at ON user_study_plan (created_at);
CREATE INDEX idx_user_study_plan_created_at ON user_study_plan (created_at);
CREATE INDEX idx_study_module_created_at ON study_module (created_at);
CREATE INDEX idx_study_topic_created_at ON study_topic (created_at);
CREATE INDEX idx_user_profile_email ON user_profile (email);
CREATE INDEX idx_user_profile_ratings ON user_profile (ratings);
CREATE INDEX idx_user_profile_fide_rating ON user_profile (fide_rating);
CREATE INDEX idx_user_profile_created_at ON user_profile (created_at);
CREATE INDEX idx_login_session_session_id ON login_session (session_id);
CREATE INDEX idx_login_session_created_at ON login_session (created_at);
CREATE INDEX idx_user_account_account_id ON user_account (account_id);
CREATE INDEX idx_user_account_created_at ON user_account (created_at);
CREATE INDEX idx_user_account_created_at ON user_account (created_at);
CREATE INDEX idx_user_progress_created_at ON user_progress (created_at);
CREATE INDEX idx_user_opening_data_created_at ON user_opening_data (created_at);
CREATE INDEX idx_profile_user_email ON profile_user (email);
CREATE INDEX idx_profile_user_current_rating ON profile_user (current_rating);
CREATE INDEX idx_profile_user_peak_rating ON profile_user (peak_rating);
CREATE INDEX idx_profile_user_rating_change ON profile_user (rating_change);
CREATE INDEX idx_profile_user_created_at ON profile_user (created_at);
CREATE INDEX idx_achievement_created_at ON achievement (created_at);
CREATE INDEX idx_use_reset_password_return_created_at ON use_reset_password_return (created_at);
CREATE INDEX idx_puzzle_rating ON puzzle (rating);
CREATE INDEX idx_puzzle_created_at ON puzzle (created_at);
CREATE INDEX idx_endgame_category_created_at ON endgame_category (created_at);
CREATE INDEX idx_progress_statistic_created_at ON progress_statistic (created_at);
CREATE INDEX idx_puzzle_source_metadata_source_id ON puzzle_source_metadata (source_id);
CREATE INDEX idx_puzzle_source_metadata_average_rating ON puzzle_source_metadata (average_rating);
CREATE INDEX idx_puzzle_source_metadata_created_at ON puzzle_source_metadata (created_at);
CREATE INDEX idx_puzzle_source_metadata_created_at ON puzzle_source_metadata (created_at);
CREATE INDEX idx_puzzle_source_mapping_created_at ON puzzle_source_mapping (created_at);
CREATE INDEX idx_custom_puzzle_rating ON custom_puzzle (rating);
CREATE INDEX idx_custom_puzzle_created_at ON custom_puzzle (created_at);
CREATE INDEX idx_custom_puzzle_collection_id ON custom_puzzle (collection_id);
CREATE INDEX idx_custom_puzzle_created_at ON custom_puzzle (created_at);
CREATE INDEX idx_custom_puzzle_collection_created_at ON custom_puzzle_collection (created_at);
CREATE INDEX idx_custom_puzzle_collection_average_rating ON custom_puzzle_collection (average_rating);
CREATE INDEX idx_custom_puzzle_collection_created_at ON custom_puzzle_collection (created_at);
CREATE INDEX idx_custom_puzzle_session_created_at ON custom_puzzle_session (created_at);
CREATE INDEX idx_custom_puzzle_filters_rating ON custom_puzzle_filters (rating);
CREATE INDEX idx_custom_puzzle_filters_created_at ON custom_puzzle_filters (created_at);
CREATE INDEX idx_custom_puzzle_search_result_created_at ON custom_puzzle_search_result (created_at);
CREATE INDEX idx_custom_puzzle_form_data_collection_id ON custom_puzzle_form_data (collection_id);
CREATE INDEX idx_custom_puzzle_form_data_created_at ON custom_puzzle_form_data (created_at);
CREATE INDEX idx_endgame_category_info_created_at ON endgame_category_info (created_at);
CREATE INDEX idx_endgame_analysis_created_at ON endgame_analysis (created_at);
CREATE INDEX idx_study_progress_position_id ON study_progress (position_id);
CREATE INDEX idx_study_progress_rating ON study_progress (rating);
CREATE INDEX idx_study_progress_created_at ON study_progress (created_at);
CREATE INDEX idx_practice_session_created_at ON practice_session (created_at);
CREATE INDEX idx_endgame_composition_created_at ON endgame_composition (created_at);
CREATE INDEX idx_endgame_library_filters_created_at ON endgame_library_filters (created_at);
CREATE INDEX idx_endgame_library_stats_created_at ON endgame_library_stats (created_at);
CREATE INDEX idx_endgame_analysis_created_at ON endgame_analysis (created_at);
CREATE INDEX idx_game_collection_created_at ON game_collection (created_at);
CREATE INDEX idx_game_collection_created_at ON game_collection (created_at);
CREATE INDEX idx_puzzle_session_created_at ON puzzle_session (created_at);
CREATE INDEX idx_puzzle_category_average_rating ON puzzle_category (average_rating);
CREATE INDEX idx_puzzle_category_created_at ON puzzle_category (created_at);
CREATE INDEX idx_puzzle_difficulty_rating ON puzzle_difficulty (rating);
CREATE INDEX idx_puzzle_difficulty_created_at ON puzzle_difficulty (created_at);
CREATE INDEX idx_puzzle_stats_current_rating ON puzzle_stats (current_rating);
CREATE INDEX idx_puzzle_stats_created_at ON puzzle_stats (created_at);
CREATE INDEX idx_recent_puzzle_rating ON recent_puzzle (rating);
CREATE INDEX idx_recent_puzzle_created_at ON recent_puzzle (created_at);
CREATE INDEX idx_achievement_created_at ON achievement (created_at);
CREATE INDEX idx_puzzle_selection_filters_created_at ON puzzle_selection_filters (created_at);
CREATE INDEX idx_custom_study_plan_created_at ON custom_study_plan (created_at);
CREATE INDEX idx_custom_study_plan_created_at ON custom_study_plan (created_at);
CREATE INDEX idx_game_filter_created_at ON game_filter (created_at);
CREATE INDEX idx_game_phase_analysis_created_at ON game_phase_analysis (created_at);
CREATE INDEX idx_game_import_created_at ON game_import (created_at);
CREATE INDEX idx_review_session_created_at ON review_session (created_at);
CREATE INDEX idx_game_review_service_created_at ON game_review_service (created_at);
CREATE INDEX idx_game_analysis_created_at ON game_analysis (created_at);
CREATE INDEX idx_game_filters_rating_range ON game_filters (rating_range);
CREATE INDEX idx_game_filters_created_at ON game_filters (created_at);
CREATE INDEX idx_study_session_game_id ON study_session (game_id);
CREATE INDEX idx_study_session_rating ON study_session (rating);
CREATE INDEX idx_study_session_created_at ON study_session (created_at);
CREATE INDEX idx_game_search_result_created_at ON game_search_result (created_at);
CREATE INDEX idx_master_game_white_rating ON master_game (white_rating);
CREATE INDEX idx_master_game_black_rating ON master_game (black_rating);
CREATE INDEX idx_master_game_avg_rating ON master_game (avg_rating);
CREATE INDEX idx_master_game_created_at ON master_game (created_at);
CREATE INDEX idx_game_setup_created_at ON game_setup (created_at);
CREATE INDEX idx_game_state_game_id ON game_state (game_id);
CREATE INDEX idx_game_state_created_at ON game_state (created_at);
CREATE INDEX idx_game_analysis_created_at ON game_analysis (created_at);
CREATE INDEX idx_tutorial_mini_game_created_at ON tutorial_mini_game (created_at);
CREATE INDEX idx_related_tutorial_created_at ON related_tutorial (created_at);
CREATE INDEX idx_study_session_plan_created_at ON study_session_plan (created_at);
CREATE INDEX idx_achievement_badge_created_at ON achievement_badge (created_at);
CREATE INDEX idx_study_progress_user_id ON study_progress (user_id);
CREATE INDEX idx_study_progress_created_at ON study_progress (created_at);
CREATE INDEX idx_study_session_created_at ON study_session (created_at);
CREATE INDEX idx_tutorial_progress_tutorial_id ON tutorial_progress (tutorial_id);
CREATE INDEX idx_tutorial_progress_user_rating ON tutorial_progress (user_rating);
CREATE INDEX idx_tutorial_progress_created_at ON tutorial_progress (created_at);
CREATE INDEX idx_tutorial_achievement_created_at ON tutorial_achievement (created_at);
CREATE INDEX idx_import_progress_created_at ON import_progress (created_at);
CREATE INDEX idx_achievement_unlock_condition_created_at ON achievement_unlock_condition (created_at);
CREATE INDEX idx_achievement_reward_created_at ON achievement_reward (created_at);
CREATE INDEX idx_achievement_series_created_at ON achievement_series (created_at);
CREATE INDEX idx_achievement_stats_created_at ON achievement_stats (created_at);
CREATE INDEX idx_achievement_filters_created_at ON achievement_filters (created_at);
CREATE INDEX idx_achievement_share_created_at ON achievement_share (created_at);
CREATE INDEX idx_achievement_leaderboard_entry_user_id ON achievement_leaderboard_entry (user_id);
CREATE INDEX idx_achievement_leaderboard_entry_username ON achievement_leaderboard_entry (username);
CREATE INDEX idx_achievement_leaderboard_entry_created_at ON achievement_leaderboard_entry (created_at);
CREATE INDEX idx_achievement_notification_created_at ON achievement_notification (created_at);
CREATE INDEX idx_training_session_rating_change ON training_session (rating_change);
CREATE INDEX idx_training_session_created_at ON training_session (created_at);
CREATE INDEX idx_achievement_created_at ON achievement (created_at);
CREATE INDEX idx_skill_progression_created_at ON skill_progression (created_at);
CREATE INDEX idx_goal_created_at ON goal (created_at);
CREATE INDEX idx_goal_created_at ON goal (created_at);
CREATE INDEX idx_sound_effect_created_at ON sound_effect (created_at);
CREATE INDEX idx_nav_item_created_at ON nav_item (created_at);
CREATE INDEX idx_piece_set_info_created_at ON piece_set_info (created_at);
CREATE INDEX idx_piece_set_info_created_at ON piece_set_info (created_at);
CREATE INDEX idx_notification_instance_group_id ON notification_instance (group_id);
CREATE INDEX idx_notification_instance_created_at ON notification_instance (created_at);
CREATE INDEX idx_notification_rule_created_at ON notification_rule (created_at);
CREATE INDEX idx_notification_rule_created_at ON notification_rule (created_at);
