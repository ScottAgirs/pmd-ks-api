# Seeding scripts fire twice

- any way to check if one has already started?
- what's a good way to handle these scenarios?

# Heaping out of memory

[2022-08-18 17:48:36] ---> Installing yarn@1.22.19
[2022-08-18 17:48:40] ---> No file to start server
[2022-08-18 17:48:40] ---> either use 'docker run' to start container or add index.js or server.js
[2022-08-18 17:48:40] Project contains yarn.lock, using yarn
[2022-08-18 17:48:40] Reusing cached node_modules from yarn.lock
[2022-08-18 17:49:02] Running custom build command: yarn build
[2022-08-18 17:49:02] yarn run v1.22.19
[2022-08-18 17:49:02] $ keystone build
[2022-08-18 17:49:13] [BABEL] Note: The code generator has deoptimised the styling of /workspace/seed/common/pharmacy-locations.ts as it exceeds the max of 500KB.
[2022-08-18 17:49:25]
[2022-08-18 17:49:25] <--- Last few GCs --->
[2022-08-18 17:49:25]
[2022-08-18 17:49:25] [777:0x4bc4770] 20672 ms: Mark-sweep 997.9 (1040.2) -> 996.3 (1046.9) MB, 959.6 / 0.1 ms (average mu = 0.374, current mu = 0.100) allocation failure scavenge might not succeed
[2022-08-18 17:49:25] [777:0x4bc4770] 22035 ms: Mark-sweep 1004.5 (1046.9) -> 1001.8 (1051.9) MB, 1334.3 / 0.0 ms (average mu = 0.190, current mu = 0.021) allocation failure scavenge might not succeed
[2022-08-18 17:49:25]
[2022-08-18 17:49:25]
[2022-08-18 17:49:25] <--- JS stacktrace --->
[2022-08-18 17:49:25]
[2022-08-18 17:49:25] FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
[2022-08-18 17:49:25] 1: 0xb02930 node::Abort()
[2022-08-18 17:49:25] 2: 0xa18149 node::FatalError(char const*, char const*)
[2022-08-18 17:49:25] 3: 0xcdd16e v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool)
[2022-08-18 17:49:25] 4: 0xcdd4e7 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool)
[2022-08-18 17:49:25] 5: 0xe94b55
[2022-08-18 17:49:25] 6: 0xea481d v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags)
[2022-08-18 17:49:25] 7: 0xea751e v8::internal::Heap::AllocateRawWithRetryOrFailSlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment)
[2022-08-18 17:49:25] 8: 0xe68a5a v8::internal::Factory::NewFillerObject(int, bool, v8::internal::AllocationType, v8::internal::AllocationOrigin)
[2022-08-18 17:49:25] 9: 0x11e17c6 v8::internal::Runtime_AllocateInYoungGeneration(int, unsigned long*, v8::internal::Isolate*)
[2022-08-18 17:49:25] 10: 0x15d5439
[2022-08-18 17:49:25] Aborted
[2022-08-18 17:49:25] error Command failed with exit code 134.
[2022-08-18 17:49:25] info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
[2022-08-18 17:49:25] building: exit status 134
[2022-08-18 17:49:25] ERROR: failed to build: exit status 1
[2022-08-18 17:49:38]
[2022-08-18 17:49:38] For documentation on the buildpacks used to build your app, please see:
[2022-08-18 17:49:38]
[2022-08-18 17:49:38] Node.js v0.3.4 https://do.co/apps-buildpack-node
[2022-08-18 17:49:38]
[2022-08-18 17:49:38] ! Build failed
[]
