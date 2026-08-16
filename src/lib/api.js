import { supabase } from "./supabase";

export async function getGuest(slug) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function confirmRsvp(id, numGuests) {
  const { data, error } = await supabase
    .from("guests")
    .update({
      confirmed: true,
      num_guests: numGuests,
      confirmed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function addSong(guestId, songName) {
  const { data, error } = await supabase
    .from("songs")
    .insert({ guest_id: guestId, song_name: songName })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchGuests() {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("display_name", { ascending: true });
  if (error) throw error;
  return data;
}

export async function fetchSongs() {
  const { data, error } = await supabase
    .from("songs")
    .select("*, guests(display_name)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function setSongSelected(songId, selected) {
  const { data, error } = await supabase
    .from("songs")
    .update({ selected })
    .eq("id", songId)
    .select()
    .single();
  if (error) throw error;
  return data;
}