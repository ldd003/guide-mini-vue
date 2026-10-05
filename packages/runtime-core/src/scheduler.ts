const queue: any[] = [];
const activePreFlushCbs: any[] = [];

let isFlushing = false;
const p = Promise.resolve();
export function nextTick(fn?) {
  return fn ? p.then(fn) : p;
}

export function queueJobs(job) {
  if (!queue.includes(job)) {
    queue.push(job);
  }
  queueFlush();
}

export function queuePreFlushCb(job) {
  activePreFlushCbs.push(job);
  queueFlush();
}

function queueFlush() {
  if (isFlushing) return;
  isFlushing = true;

  nextTick(flushJobs);
}

function flushJobs() {
  isFlushing = false;

  flushPreFlushCbs();

  let job;
  while ((job = queue.shift())) {
    job && job();
  }
}

function flushPreFlushCbs() {
  for (let i = 0; i < activePreFlushCbs.length; i++) {
    activePreFlushCbs[i]();
  }
}
