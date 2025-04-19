---
title: 'Technical Interview Questions I Wish I Could Do Over #1'
subtitle: JavaScript Execution Model
date: 4/16/2025
tags: ['javascript', 'technical interview']
---

Technical interviews can be challenging. There are times you'll know ahead of
time what questions might be asked. Other times you won't know until you're in
the interview. I don't know about you, but I don't practice interviewing until I
need to interview, which means I always feel a little rusty. Sometimes I leave
technical interviews feeling great about my performance, but a lot of the time
there are questions I wish I could do over. Maybe I blanked on something basic
(what's the hook for storing state in react) or maybe the question was a topic
I'm less familiar with. While a poor performance can be disappointing I always
try to reflect on my answers and look for ways to improve.

This series is intended to be part therapeutic, part knowledge share: a place to
break down questions I wish I could do over. Whether you're prepping for
interviews, brushing up on fundamentals, or just enjoy a bit of technical
storytelling, I hope these posts are useful and maybe even a little cathartic.
Who knows, maybe I'll write about technical interviews I do well in too.

## What will be the output of the following code and why?

```javascript
console.log('start');

setTimeout(function setTimeoutFunc() {
    console.log('timeout');
}, 0);

Promise.resolve().then(function firstPromiseFunc() {
    console.log('promise 1');
});

async function asyncFunc() {
    console.log('async start');
    await Promise.resolve();
    console.log('async end');
}

asyncFunc();

console.log('end');
```

After taking a minute to read through the code this was my response:

```
start, timeout, promise 1, async start, end, async end
```

The actual output is:

```
start, async start, end, promise 1, async end, timeout
```

I misunderstood two big parts of the execution model:

- how `setTimeout` and `setInterval` are handled, even when passed `0` to their
  delay argument
- the microtask queue

There are three key parts to the JavaScript execution model: the `Call Stack`,
the `Microtask Queue`, and the `Task Queue`.

```
| Call Stack | Microtask Queue | Task Queue |
```

When the program runs the first line it evaluates is:

```javascript
console.log('start');
```

This operation is added to the `Call Stack`

```
|    Call Stack      | Microtask Queue | Task Queue |
|       ---          |     ---         |    ---     |
|console.log('start')|
```

Since this operation is synchronous it is executed immediately and removed from
the stack. So we see `start` logged and the `Call Stack` returns to its previous
state.

```
|    Call Stack      | Microtask Queue | Task Queue |
|       ---          |     ---         |    ---     |
```

Pretty simple so far.

The next line evaluated is the `setTimeout`. Here I assumed the `setTimeout`
would be added to the `Call Stack`, the timer started, and since it was `0`, the
callback function would be executed immediately. But what really happens is the
callback function (`setTimeoutFunc()`) is added to the `Task Queue` and the
program moves to the next line to evaluate.

```
|    Call Stack   | Microtask Queue |     Task Queue  |
|       ---       |     ---         |        ---      |
|                 |                 | setTimeoutFunc()|
```

The next block of code that is evaluated is:

```
Promise.resolve().then(function firstPromiseFunc() {
    console.log('promise 1');
});
```

Since this is an asynchronous function it is added to the `Microtask Queue`

```
|    Call Stack   | Microtask Queue |     Task Queue  |
|       ---       |     ---         |        ---      |
|                 |firstPromisFunc()| setTimeoutFunc()|
```

And the program moves to the next lines:

```
async function asyncFunc() {
    console.log('async start');
    await Promise.resolve();
    console.log('async end');
}

asyncFunc();
```

The `asyncFunc()` is added to the call stack:

```
|    Call Stack   | Microtask Queue |     Task Queue  |
|       ---       |     ---         |        ---      |
|    asyncFunc()  |firstPromisFunc()| setTimeoutFunc()|
```

The first `console.log` statement is synchronous so it is executed logging
`async start` and then the program gets to the `await` keyword. `await` is
syntactic sugar for native Promises so the event loop treats this the same way
it did the previous `Promise`, the `console.log('async end')` is scheduled in
the Microtask Queue, and at that point, `asyncFunc()` is paused and removed from
the call stack. Its remaining execution (everything after the await) will resume
in the microtask phase of the event loop.

```
|    Call Stack   |     Microtask Queue    |     Task Queue  |
|       ---       |          ---           |        ---      |
|                 |firstPromisFunc()       | setTimeoutFunc()|
|                 |console.log('async end')|                 |                 |
```

The program then moves on to the last line:

```
console.log('end');
```

and since this is a synchronous operation it is added to the stack and executed
immediately.

The end of the program has been reached so the event loop moves to the
`Microtask Queue`. The `Task Queue` and the `Microtask Queue` both operate on a
First in, First out basis. For my example, `firstPromiseFunc()` was added to the
queue first so it is executed first and `promise 1` is logged. Then
`firstPromiseFunc()` is removed from the queue. The event loop checks to see if
there are any tasks left in the `Microtask Queue` and since there is it is
executed next and we see `async end` logged.

Now that the `Microtask Queue` is empty the event loop moves to the `Task Queue`
and executes tasks on the same First in, First out basis. For this example we
now see `timeout` logged.

## Key Takeaways

- Timer functions, `setTimeout` and `setInterval`, never run immediately. Even
  if the delay argument is `0`. The callbacks are added to the `Task Queue`.
- All async code, anything wrapped in a `Promise` or that comes after `await`,
  is added to the `Microtask Queue`.
- The tasks in the `Microtask Queue` will be executed before the event loop
  moves to the `Task Queue`.

## Further Reading

- [MDN JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)
- [MDN In Depth: Microtasks and the JavaScript runtime environment](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth)
- [JavaScript Visualizer 9000](https://www.jsv9000.app/?code=Y29uc29sZS5sb2coJ3N0YXJ0JykKCnNldFRpbWVvdXQoZnVuY3Rpb24gdGltb3V0RnVuYygpIHsKICBjb25zb2xlLmxvZygndGltZW91dCcpCn0sIDApCgpQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uIGZpcnN0UHJvbWlzZUZ1bmMoKSB7CiAgY29uc29sZS5sb2coJ3Byb21pc2UgMScpCn0pCgpmdW5jdGlvbiB0ZXN0KCkgewogIGNvbnNvbGUubG9nKCdhc3luYyBzdGFydCcpCiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gc2Vjb25kUHJvbWlzZUZ1bmMoKSB7CiAgICBjb25zb2xlLmxvZygnYXN5bmMgZW5kJykgIAogIH0pCn0KCnRlc3QoKTsKCmNvbnNvbGUubG9nKCdlbmQnKQ%3D%3D)
  (There seems to be an issue with the `await` keyword in the JavaScript)
  visualizer so I've rewritten that code using `Promise`. I've also added a
  `log` function to help with the visualization)

## Closing Thoughts

This question reminded me how important it is to understand not just what
JavaScript does, but when it does it. Before this technical interview I would've
said I had a good mental model of how async code works but realizing how the
microtask and task queues work helped me connect a few lingering gaps in my
mental model. Now that I’ve internalized the way the event loop processes
Promises, async/await, and setTimeout/setInterval, I’ll be more confident when
questions like this come up.

Next up: not every technical interview leaves me wishing for a do-over. In the
next post, I’ll break down a question I nailed — a moment where preparation and
curiosity paid off.
