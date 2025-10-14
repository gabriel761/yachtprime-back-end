SET client_encoding TO 'UTF8';

-- Desativar restrições temporariamente
SET session_replication_role = 'replica';
DROP TABLE IF EXISTS 
    user_type,
    app_user
CASCADE;

SET session_replication_role = 'origin';