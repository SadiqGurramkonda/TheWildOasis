import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vgxuarxkrhkltclnfpbf.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZneHVhcnhrcmhrbHRjbG5mcGJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MDQ0OTMsImV4cCI6MjA0MjQ4MDQ5M30.muWMCglYtB9xymjdvADG6_Eylth1tdGmONSkMzc_IXs`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
