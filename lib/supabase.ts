import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hdkrfwgcmkxeeazkceiv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhka3Jmd2djbWt4ZWVhemtjZWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODM1MTIsImV4cCI6MjA3NzY1OTUxMn0.dQrxkDN24a0yaRr-1DsssacRK3TuhSytWU93UCEOKXY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)