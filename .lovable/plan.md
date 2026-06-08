Update the Download section to show only the Windows download option.

- Remove macOS and Linux entries from the platform list in `src/components/landing/Download.tsx`
- Remove the platform selector tabs (Windows will be the only remaining option)
- Keep the existing Windows download button, file info, and "All releases" link
- Remove now-unused `detectPlatform` logic and mac/linux icon components