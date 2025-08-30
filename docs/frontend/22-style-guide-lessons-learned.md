# Document 22: Style Guide - Lessons Learned

**Created**: 2025-08-30  
**Phase**: Post-Dashboard Implementation  
**Related Documents**: 
- [Document 19](./19-dashboard-improvements-and-global-architecture.md) - Dashboard implementation
- [Document 21](./21-layout-implementation-lessons-learned.md) - Layout lessons

## 🎨 Critical Style Guide Violations & Fixes

### **1. Color System - NEVER Use Hardcoded Colors**

#### **❌ WRONG - Hardcoded Colors**:
```tsx
// NEVER DO THIS - hardcoded white colors
<h1 className="text-white">Welcome back</h1>
<p className="text-white/70">Subtitle</p>
<div className="border-white/10 bg-black/20">
```

#### **✅ CORRECT - Semantic Theme Variables**:
```tsx
// ALWAYS USE - semantic Tailwind theme variables
<h1 className="text-foreground">Welcome back</h1>
<p className="text-muted-foreground">Subtitle</p>
<div className="border-border bg-card">
```

#### **Available Theme Variables**:
```css
/* Text Colors */
text-foreground         /* Primary text */
text-muted-foreground   /* Secondary/muted text */
text-primary            /* Accent text */
text-destructive        /* Error text */

/* Background Colors */
bg-background           /* Page background */
bg-card                 /* Card backgrounds */
bg-secondary            /* Secondary backgrounds */
bg-primary              /* Accent backgrounds */

/* Border Colors */
border-border           /* Default borders */
border-input            /* Form inputs */
border-primary          /* Accent borders */
```

### **2. Component Architecture - Follow Specifications Exactly**

#### **❌ WRONG - Improvising Layout**:
```tsx
// Don't add components not in specs
<PerformanceAnalytics />  // Not in Document 19 ASCII mockup
<RecentGamesWidget />     // Should be "Recent Activity" in header

// Don't use grid when specs show vertical stack
<div className="grid grid-cols-2">
  <Component1 />
  <Component2 />
</div>
```

#### **✅ CORRECT - Follow ASCII Mockup Exactly**:
```tsx
// Follow Document 19 ASCII mockup order precisely
<DashboardHeader />      // Includes stats + recent activity
<ThemeShowcase />        // Theme cards
<QuickActions />         // Action buttons
<DailyGoals />          // Progress bars
<RecentAchievements />   // Achievement highlights
```

### **3. API Integration - Use Existing Infrastructure**

#### **❌ WRONG - Mock Data in Components**:
```tsx
// Don't hardcode mock data
const stats = [
  { label: 'ELO', value: 1200 },  // Hardcoded
  { label: 'Games', value: 23 }   // Mock data
]
```

#### **✅ CORRECT - Use Existing Hooks**:
```tsx
// Use the already-built API infrastructure
const { stats, isLoading } = useDashboard()
const headerStats = [
  { label: 'ELO', value: stats?.chess_elo || 1200 },
  { label: 'Games', value: stats?.games_played || 0 }
]
```

### **4. Icon System - No Emojis, Use Lucide React**

#### **❌ WRONG - Unicode Emojis**:
```tsx
// NEVER use emoji unicode
icon: '🌊'    // Cyber theme
icon: '🔥'    // Dragon theme
icon: '⚔️'    // Crimson theme

// Don't render as text
<div className="text-2xl">{theme.icon}</div>
```

#### **✅ CORRECT - Lucide React Icons**:
```tsx
// USE proper icon components
import { Waves, Flame, Sword } from 'lucide-react'

icon: Waves   // Cyber theme
icon: Flame   // Dragon theme  
icon: Sword   // Crimson theme

// Render as components
<theme.icon className="w-6 h-6 text-foreground" />
```

### **5. Card Components - Use Shadcn Consistently**

#### **❌ WRONG - Basic Div Elements**:
```tsx
// Don't use basic divs with custom classes
<div className="bg-card p-6 rounded-lg border">
  <h2>Title</h2>
  <div>Content</div>
</div>
```

#### **✅ CORRECT - Shadcn Card Components**:
```tsx
// USE proper Card structure from shadcn
import { Card, CardHeader, CardContent } from '../ui/card'

<Card>
  <CardHeader>
    <h2>Title</h2>
  </CardHeader>
  <CardContent>
    <div>Content</div>
  </CardContent>
</Card>
```

### **6. Documentation Compliance - Read Specs First**

#### **Process Violation - Building Without Reading**:
❌ **What I did wrong**: Built dashboard components from memory instead of reading Document 19 ASCII mockup

#### **✅ CORRECT Process**:
1. **Read specifications completely** before coding
2. **Reference ASCII mockups** as authoritative layout
3. **Follow component order exactly** as specified
4. **Use existing API infrastructure** (don't recreate)
5. **Validate against documentation** before declaring complete

### **7. Background Transparency - Respect Theme System**

#### **❌ WRONG - Blocking Animated Backgrounds**:
```css
/* Don't use solid backgrounds that block themes */
body { 
  background: #000;  /* Blocks animated theme background */
}
.main-content {
  background: linear-gradient(...);  /* Blocks theme */
}
```

#### **✅ CORRECT - Transparent Hierarchy**:
```css
/* Let theme backgrounds show through */
html, body { 
  background: transparent !important; 
}
.main-content {
  /* No background - let theme show through */
}
```

## 🔧 Implementation Checklist

### **Before Building Any Component:**
- [ ] Read complete specification/documentation
- [ ] Identify ASCII mockups or layout requirements  
- [ ] Check for existing API hooks/infrastructure
- [ ] Verify theme color variables needed
- [ ] Confirm icon requirements (Lucide React only)

### **During Development:**
- [ ] Use semantic color classes only (`text-foreground`, `text-muted-foreground`)
- [ ] Import and use Lucide React icons (no emojis)
- [ ] Use Shadcn Card/CardHeader/CardContent structure
- [ ] Wire to existing API hooks (`useDashboard`, etc.)
- [ ] Test theme switching works properly

### **Before Declaring Complete:**
- [ ] Compare against original specification/mockup
- [ ] Verify all colors use theme variables
- [ ] Confirm no hardcoded values
- [ ] Test with different themes
- [ ] Validate API integration works

## 📚 Reference Documentation

### **Key Documents to Always Check:**
1. **ASCII Mockups** - Authoritative layout specifications
2. **API Hook Documentation** - Use existing infrastructure  
3. **Theme System** - Color variables and background system
4. **Shadcn Documentation** - Component structure standards

### **Common Mistakes to Avoid:**
1. **Hardcoding colors** instead of theme variables
2. **Using emojis** instead of Lucide React icons
3. **Improvising layout** instead of following specs
4. **Mock data** instead of API integration
5. **Basic divs** instead of Shadcn components
6. **Solid backgrounds** that block theme animations

---

**Key Lesson**: Always follow specifications exactly rather than improvising "better" solutions. The existing infrastructure and design system exists for consistency and should be used.