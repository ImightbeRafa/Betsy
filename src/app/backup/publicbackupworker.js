// public/backup-worker.js
const BACKUP_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Handle scheduled backup
self.addEventListener('message', (event) => {
  if (event.data === 'START_BACKUP') {
    scheduleBackup();
  }
});

function scheduleBackup() {
  setInterval(async () => {
    try {
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage('TRIGGER_BACKUP');
      });
    } catch (error) {
      console.error('Backup scheduling error:', error);
    }
  }, BACKUP_INTERVAL);
}