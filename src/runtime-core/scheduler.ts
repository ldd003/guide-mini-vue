const queue: any[] = [];
let isFlushing = false;
const p = Promise.resolve();
export function nextTick(fn) {
  return fn ? p.then(fn) : p;
}

export function queueJobs(job) {
  if (!queue.includes(job)) {
    queue.push(job);
  }
  queueFlush();
}

function queueFlush() {
  if (isFlushing) return;
  isFlushing = true;

  nextTick(flushJobs);
}

function flushJobs() {
  isFlushing = false;
  let job;
  while ((job = queue.shift())) {
    job && job();
  }
}
