import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'Add your'
const supabaseAnonKey =  'Add your'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
