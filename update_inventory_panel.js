const fs = require('fs');

let content = fs.readFileSync('components/inventory-panel.tsx', 'utf8');

// Add state for currentPage
content = content.replace(
  'const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")',
  `const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")
  const [currentPage, setCurrentPage] = useState(1)`
);

// Update displayedSkins to reset page on change
content = content.replace(
  'const displayedSkins = useMemo(() => {',
  `// Reset page when mode or sortOrder changes
  useMemo(() => {
    setCurrentPage(1)
  }, [mode, sortOrder])

  const displayedSkins = useMemo(() => {`
);

content = content.replace(
  'return [...skins].sort((a, b) => {',
  `return [...skins].sort((a, b) => {`
);

// Replace displayedSkins.map with currentItems.map and add currentItems calculation
content = content.replace(
  'const hexToRgb = (hex: string) => {',
  `const ITEMS_PER_PAGE = 20
  const totalPages = Math.max(1, Math.ceil(displayedSkins.length / ITEMS_PER_PAGE))
  const validCurrentPage = Math.min(currentPage, totalPages)
  const currentItems = displayedSkins.slice((validCurrentPage - 1) * ITEMS_PER_PAGE, validCurrentPage * ITEMS_PER_PAGE)

  const hexToRgb = (hex: string) => {`
);

// Oh wait, hexToRgb is defined inside the map function! I should add the slice before the map.
// Let's replace `displayedSkins.map((item, index) => {`
content = content.replace(
  `{displayedSkins.map((item, index) => {`,
  `{(() => {
              const ITEMS_PER_PAGE = 20
              const totalPages = Math.max(1, Math.ceil(displayedSkins.length / ITEMS_PER_PAGE))
              const validCurrentPage = Math.min(currentPage, totalPages)
              const currentItems = displayedSkins.slice((validCurrentPage - 1) * ITEMS_PER_PAGE, validCurrentPage * ITEMS_PER_PAGE)
              
              return currentItems.map((item, index) => {`
);
// and close it properly later. But it's better to calculate it outside the render.
