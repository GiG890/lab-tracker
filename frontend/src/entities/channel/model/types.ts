export interface Channel {
  id: number;
  name: string;
  description: string | null;
  owner_id: number;
  created_at: string;
}

export interface ChannelCreate {
  name: string;
  description?: string;
  owner_id: number;
}