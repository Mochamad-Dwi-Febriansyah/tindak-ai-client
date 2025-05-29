export interface Complaint {
  id: string
  user_id: string
  institution_id?: string
  title: string
  description: string
  location?: string
  latitude?: number
  longitude?: number
  status: 'done' | 'pending' | 'rejected' | 'in_progress' | 'withdrawn'
  estimated_at?: string
  created_at: string
  updated_at: string
}
