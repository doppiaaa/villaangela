import { createClient } from '@supabase/supabase-js';

// Updated with correct Anon Public Key and Project URL
const supabaseUrl = 'https://lizeyrhkjhqhoeafonzi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwbm9pdml5Y2hoZ25vaXloeWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4OTA0ODgsImV4cCI6MjA5MDQ2NjQ4OH0.rzSjzQX-XYn6p4hHjIg3aD8yUa4849lUe8z-xIQGHTU'; // ATTENZIONE: Questa chiave appartiene a un altro progetto. Per favore inserisci la chiave Anon Public corretta per lizeyrhkjhqhoeafonzi.

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
