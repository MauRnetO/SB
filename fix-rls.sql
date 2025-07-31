-- Script para corrigir RLS da tabela users
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar se a tabela users existe
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'users'
);

-- 2. Verificar estrutura da tabela users
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'users'
ORDER BY ordinal_position;

-- 3. Desabilitar RLS temporariamente para teste
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- 4. Ou criar política RLS adequada
-- DROP POLICY IF EXISTS "Users can insert their own data" ON users;
-- CREATE POLICY "Users can insert their own data" ON users
--   FOR INSERT WITH CHECK (auth.uid() = id);

-- 5. Ou habilitar RLS com política permissiva para desenvolvimento
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow all operations for development" ON users
--   FOR ALL USING (true) WITH CHECK (true);

-- 6. Verificar políticas existentes
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'users'; 