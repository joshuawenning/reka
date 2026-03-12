const STORAGE_KEY = 'reka-data';

const defaultData = {
  entries: [],
  preferences: {
    use24Hour: false,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    theme: 'system'
  }
};

function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load data:', e);
  }
  return defaultData;
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data:', e);
  }
}

let appData = loadData();

export function getEntries() {
  return appData.entries;
}

export function getPreferences() {
  return appData.preferences;
}

export function addEntry(entry) {
  const newEntry = {
    id: crypto.randomUUID(),
    project: entry.project || 'Untitled',
    description: entry.description || '',
    startTime: entry.startTime,
    endTime: entry.endTime,
    duration: entry.duration,
    createdAt: Date.now()
  };
  appData.entries.unshift(newEntry);
  saveData(appData);
  return newEntry;
}

export function updateEntry(id, updates) {
  const index = appData.entries.findIndex(e => e.id === id);
  if (index !== -1) {
    appData.entries[index] = { ...appData.entries[index], ...updates };
    saveData(appData);
    return appData.entries[index];
  }
  return null;
}

export function deleteEntry(id) {
  appData.entries = appData.entries.filter(e => e.id !== id);
  saveData(appData);
}

export function updatePreferences(updates) {
  appData.preferences = { ...appData.preferences, ...updates };
  saveData(appData);
  applyTheme(appData.preferences.theme);
}

export function getProjects() {
  const projects = new Map();
  appData.entries.forEach(entry => {
    const name = entry.project.toLowerCase();
    if (!projects.has(name)) {
      projects.set(name, { name: entry.project, count: 0, totalDuration: 0 });
    }
    const p = projects.get(name);
    p.count++;
    if (entry.duration) p.totalDuration += entry.duration;
  });
  return Array.from(projects.values()).sort((a, b) => b.count - a.count);
}

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', theme);
  }
}

export function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function formatTime(date, use24Hour) {
  const d = new Date(date);
  if (use24Hour) {
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  }
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function formatDate(date) {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
