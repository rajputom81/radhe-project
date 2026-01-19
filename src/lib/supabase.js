import { createClient } from '@supabase/supabase-js';

// 🔐 ENV (Vite format)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* =========================================================
   AUTH (CUSTOM ADMIN LOGIN)
========================================================= */

export const getUpdateById = async (id) => {
  const { data, error } = await supabase
    .from('updates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};


export const loginAdmin = async (username, password) => {
  const { data, error } = await supabase
    .from('admins')
    .select('id, username, role, is_active')
    .eq('username', username)
    .eq('password', password)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    return { success: false, error: 'Invalid or disabled user' };
  }

  return { success: true, data };
};


export const getSettings = async () => {
  const { data, error } = await supabase
    .from('admins')
    .select('id, username, full_name')
    .limit(1)
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

/* =========================================================
   POSTS / UPDATES
========================================================= */

export const getUpdates = async () => {
  const { data, error } = await supabase
    .from('updates')
    .select('*')
    .order('publish_date', { ascending: false });

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

export const createUpdate = async (updateData) => {
  const { data, error } = await supabase
    .from('updates')
    .insert(updateData)
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

export const updateUpdate = async (id, updateData) => {
  const { data, error } = await supabase
    .from('updates')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

export const deleteUpdate = async (id) => {
  const { error } = await supabase
    .from('updates')
    .delete()
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  return { success: true };
};

/* =========================================================
   ENQUIRIES / CONTACTS
========================================================= */

export const createContact = async (contactData) => {
  const { data, error } = await supabase
    .from('contacts')
    .insert(contactData)
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

export const getContacts = async () => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

export const updateContactStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('contacts')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

export const updateContactContacted = async (id, contacted) => {
  const { data, error } = await supabase
    .from('contacts')
    .update({ contacted })
    .eq('id', id)
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

export const deleteContact = async (id) => {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  return { success: true };
};

export const updateSettings = async (settingsData) => {
  // 1️⃣ Get current admin (only one for now)
  const { data: admin, error: fetchError } = await supabase
    .from('admins')
    .select('id')
    .limit(1)
    .single();

  if (fetchError || !admin) {
    return { success: false, error: 'Admin not found' };
  }

  const { new_password, ...rest } = settingsData;

  const updatePayload = { ...rest };
  if (new_password) {
    updatePayload.password = new_password;
  }

  // 2️⃣ Update USING WHERE clause
  const { data, error } = await supabase
    .from('admins')
    .update(updatePayload)
    .eq('id', admin.id)     // ✅ REQUIRED
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

// GET ALL USERS
export const getUsers = async () => {
  const { data, error } = await supabase
    .from('admins')
    .select('id, username, role, is_active, created_at')
    .order('created_at', { ascending: false });

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

// ADD USER
export const createUser = async ({ username, password, role = 'admin' }) => {
  const { data, error } = await supabase
    .from('admins')
    .insert({
      username,
      password,
      role,
      is_active: true
    })
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

// UPDATE USER (username / password / role)
export const updateUser = async (id, updates) => {
  const payload = { ...updates };

  if (!payload.password) {
    delete payload.password;
  }

  const { data, error } = await supabase
    .from('admins')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

// ENABLE / DISABLE USER
export const toggleUserStatus = async (id, is_active) => {
  const { data, error } = await supabase
    .from('admins')
    .update({ is_active })
    .eq('id', id)
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

