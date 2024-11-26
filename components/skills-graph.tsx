// #############################################
// ||                                         ||
// ||Fonctionnalité en cours de développement ||
// ||Sera disponible dans la prochaine version||
// ||                                         ||
// ||                                         ||
// #############################################


// "use client"

// import { useRef, useCallback, useState } from 'react'
// import dynamic from 'next/dynamic'
// import { motion, AnimatePresence } from 'framer-motion'
// import { graphData } from '@/lib/skills-data'
// import { cn } from '@/lib/utils'

// const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
//   ssr: false,
//   loading: () => (
//     <div className="w-full h-[600px] flex items-center justify-center bg-secondary/30 rounded-lg backdrop-blur-sm border border-primary/10">
//       <div className="animate-pulse text-muted-foreground">
//         <div className="w-48 h-2 bg-primary/20 rounded-full mb-3"></div>
//         <div className="w-32 h-2 bg-primary/20 rounded-full"></div>
//       </div>
//     </div>
//   )
// })

// interface NodeData {
//   id: string
//   name: string
//   group: string
//   level: number
//   description: string
//   val: number
//   x?: number
//   y?: number
// }

// interface LinkData {
//   source: string | NodeData
//   target: string | NodeData
//   strength: number
// }

// export default function SkillsGraph() {
//   const [selectedNode, setSelectedNode] = useState<NodeData | null>(null)
//   const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null)
//   const graphRef = useRef()

//   const handleNodeClick = useCallback((node: NodeData) => {
//     setSelectedNode(node === selectedNode ? null : node)
//   }, [selectedNode])

//   const handleNodeHover = useCallback((node: NodeData | null) => {
//     setHoveredNode(node)
//   }, [])

//   const getNodeColor = (group: string, isHovered: boolean, isSelected: boolean) => {
//     const baseColors: { [key: string]: string } = {
//       Frontend: '221, 83%, 53%',
//       Backend: '280, 83%, 53%',
//       Database: '190, 83%, 53%',
//       DevOps: '150, 83%, 53%',
//       Languages: '330, 83%, 53%'
//     }
    
//     const baseColor = baseColors[group] || '221, 83%, 53%'
    
//     if (isSelected) return `hsl(${baseColor})`
//     if (isHovered) return `hsla(${baseColor}, 0.8)`
//     return `hsla(${baseColor}, 0.6)`
//   }

//   return (
//     <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-secondary/30 backdrop-blur-sm border border-primary/10">
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10" />
      
//       <ForceGraph2D
//         ref={graphRef}
//         graphData={graphData}
//         backgroundColor="transparent"
//         nodeLabel="name"
//         nodeColor={(node: NodeData) => 
//           getNodeColor(
//             node.group, 
//             node === hoveredNode,
//             node === selectedNode
//           )
//         }
//         nodeRelSize={6}
//         nodeVal={(node: NodeData) => 
//           node === hoveredNode || node === selectedNode 
//             ? node.val * 1.5 
//             : node.val
//         }
//         linkWidth={(link: LinkData) => {
//           const isSelected = link.source === selectedNode || link.target === selectedNode
//           const isHovered = link.source === hoveredNode || link.target === hoveredNode
//           return isSelected ? 2 : isHovered ? 1.5 : 1
//         }}
//         linkColor={(link: LinkData) => {
//           const isSelected = link.source === selectedNode || link.target === selectedNode
//           const isHovered = link.source === hoveredNode || link.target === hoveredNode
//           return isSelected 
//             ? 'hsla(var(--primary), 0.4)'
//             : isHovered
//               ? 'hsla(var(--primary), 0.3)'
//               : 'hsla(var(--primary), 0.15)'
//         }}
//         onNodeClick={handleNodeClick}
//         onNodeHover={handleNodeHover}
//         nodeCanvasObject={(node: NodeData, ctx, globalScale) => {
//           const isSelected = node === selectedNode
//           const isHovered = node === hoveredNode
//           const label = node.name
//           const fontSize = isSelected ? 14/globalScale : 12/globalScale
//           ctx.font = `${isSelected ? 'bold' : ''} ${fontSize}px Inter, system-ui, sans-serif`
//           const textWidth = ctx.measureText(label).width
//           const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.8)

//           // Node background
//           ctx.fillStyle = isSelected || isHovered
//             ? 'hsla(var(--background), 0.95)'
//             : 'hsla(var(--background), 0.8)'
//           ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
//           ctx.shadowBlur = 10
//           ctx.shadowOffsetX = 2
//           ctx.shadowOffsetY = 2
//           ctx.beginPath()
//           ctx.roundRect(
//             node.x! - bckgDimensions[0] / 2,
//             node.y! - bckgDimensions[1] / 2,
//             bckgDimensions[0],
//             bckgDimensions[1],
//             4
//           )
//           ctx.fill()
//           ctx.shadowColor = 'transparent'

//           // Node border
//           ctx.strokeStyle = getNodeColor(node.group, isHovered, isSelected)
//           ctx.lineWidth = isSelected ? 2 : 1
//           ctx.stroke()

//           // Node text
//           ctx.textAlign = 'center'
//           ctx.textBaseline = 'middle'
//           ctx.fillStyle = isSelected || isHovered
//             ? getNodeColor(node.group, isHovered, isSelected)
//             : 'hsl(var(--foreground))'
//           ctx.fillText(label, node.x!, node.y!)
//         }}
//         cooldownTicks={100}
//         d3AlphaDecay={0.02}
//         d3VelocityDecay={0.3}
//         width={800}
//         height={600}
//       />

//       <AnimatePresence>
//         {selectedNode && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             className="absolute bottom-4 left-4 right-4 p-6 bg-background/95 backdrop-blur-sm rounded-lg border border-primary/10 shadow-xl"
//           >
//             <div className="flex items-start justify-between gap-4">
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-2">
//                   <h3 className="text-xl font-bold">{selectedNode.name}</h3>
//                   <span 
//                     className={cn(
//                       "px-2 py-1 text-xs rounded-full font-medium",
//                       {
//                         'bg-blue-500/10 text-blue-500': selectedNode.group === 'Frontend',
//                         'bg-purple-500/10 text-purple-500': selectedNode.group === 'Backend',
//                         'bg-cyan-500/10 text-cyan-500': selectedNode.group === 'Database',
//                         'bg-green-500/10 text-green-500': selectedNode.group === 'DevOps',
//                         'bg-pink-500/10 text-pink-500': selectedNode.group === 'Languages',
//                       }
//                     )}
//                   >
//                     {selectedNode.group}
//                   </span>
//                 </div>
//                 <p className="text-muted-foreground mb-4">{selectedNode.description}</p>
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-muted-foreground">Niveau de maîtrise</span>
//                     <span className="font-medium">{selectedNode.level}%</span>
//                   </div>
//                   <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
//                     <motion.div 
//                       className="h-full bg-primary"
//                       initial={{ width: 0 }}
//                       animate={{ width: `${selectedNode.level}%` }}
//                       transition={{ duration: 0.5, ease: "easeOut" }}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setSelectedNode(null)}
//                 className="p-2 hover:bg-secondary/80 rounded-lg transition-colors"
//               >
//                 <span className="sr-only">Fermer</span>
//                 <svg
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }