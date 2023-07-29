# 我的 Vue 3

### ref 默认值

推荐使用
```tsx
const div = ref <HTMLDivElement>()
```

不推荐使用
```tsx
const div = ref <HTMLDivElement | undefined>(null)
```