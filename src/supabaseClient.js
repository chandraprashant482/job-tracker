import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kuceykzejmcobsfagrni.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1Y2V5a3plam1jb2JzZmFncm5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODQ0ODksImV4cCI6MjA4MTQ2MDQ4OX0.9TATRdPfsN8KsxFomdzdvDo9nx8f5pOAwozchNED5es'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
