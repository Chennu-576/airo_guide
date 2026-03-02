// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { ChevronDown } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import * as Icons from 'lucide-react';
// import { Category, Article } from '@/lib/supabase';
// import { cn } from '@/lib/utils';

// interface SidebarProps {
//   categories: (Category & { articles: Article[] })[];
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function Sidebar({ categories, isOpen, onClose }: SidebarProps) {
//   const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
//     new Set(categories.map(cat => cat.id))
//   );
//   const pathname = usePathname();

//   const toggleCategory = (categoryId: string) => {
//     const newExpanded = new Set(expandedCategories);
//     if (newExpanded.has(categoryId)) {
//       newExpanded.delete(categoryId);
//     } else {
//       newExpanded.add(categoryId);
//     }
//     setExpandedCategories(newExpanded);
//   };

//   const getIcon = (iconName: string) => {
//     const Icon = (Icons as any)[iconName] || Icons.FileText;
//     return <Icon className="w-4 h-4" />;
//   };

//   return (
//     <>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//             onClick={onClose}
//           />
//         )}
//       </AnimatePresence>

//       <motion.aside
//         initial={{ x: -320 }}
//         animate={{ x: isOpen ? 0 : -320 }}
//         transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//         className={cn(
//           'fixed top-16 left-0 bottom-0 w-80 bg-white border-r border-gray-200 overflow-y-auto z-40',
//           'lg:translate-x-0 lg:static lg:z-0'
//         )}
//         style={{ transform: isOpen ? 'translateX(0)' : undefined }}
//       >
//         <div className="p-6">
//           <nav className="space-y-1">
//             {categories.map((category) => {
//               const isExpanded = expandedCategories.has(category.id);

//               return (
//                 <div key={category.id}>
//                   <button
//                     onClick={() => toggleCategory(category.id)}
//                     className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
//                   >
//                     <div className="flex items-center gap-2">
//                       <span className="text-[#4931ed]">
//                         {getIcon(category.icon)}
//                       </span>
//                       <span>{category.title}</span>
//                     </div>
//                     <motion.div
//                       animate={{ rotate: isExpanded ? 180 : 0 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <ChevronDown className="w-4 h-4 text-gray-400" />
//                     </motion.div>
//                   </button>

//                   <AnimatePresence>
//                     {isExpanded && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: 'auto', opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="overflow-hidden"
//                       >
//                         <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-100 pl-4">
//                           {category.articles.map((article) => {
//                             const isActive = pathname === `/docs/${category.slug}/${article.slug}`;

//                             return (
//                               <Link
//                                 key={article.id}
//                                 href={`/docs/${category.slug}/${article.slug}`}
//                                 onClick={() => {
//                                   if (window.innerWidth < 1024) {
//                                     onClose();
//                                   }
//                                 }}
//                                 className={cn(
//                                   'block px-3 py-2 text-sm rounded-lg transition-colors',
//                                   isActive
//                                     ? 'bg-gradient-to-r from-[#4931ed]/10 to-[#a836ba]/10 text-[#4931ed] font-medium border-l-2 border-[#4931ed] -ml-[2px]'
//                                     : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                                 )}
//                               >
//                                 {article.title}
//                               </Link>
//                             );
//                           })}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })}
//           </nav>
//         </div>
//       </motion.aside>
//     </>
//   );
// }



// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { ChevronDown } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import * as Icons from 'lucide-react';

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// // All your sidebar data right here in the same file
// const sidebarCategories = [
//   {
//     id: 'quick-start',
//     title: 'Quick Start',
//     icon: 'Rocket',
//     articles: [
//       { id: 'free-trail', title: 'free-trail' },
//       { id: 'feature-snapshot', title: 'feature-snapshot' },
//       { id: 'app-section', title: 'app-section' },
//       { id: 'reports', title: 'Reports' },
//       { id: 'tasks', title: 'Tasks' },
//       { id: 'leadfinder', title: 'LeadFinder' }
//     ]
//   },
//   {
//     id: 'campaign-creation',
//     title: 'Campaign Creation',
//     icon: 'Megaphone',
//     articles: [
//       { id: 'email-campaigns', title: 'Email Campaigns with AI Agents' },
//       { id: 'multichannel', title: 'Multichannel Drip Campaigns' },
//       { id: 'prospect-importing', title: 'Prospect Importing (Manual, CSV, Third-party)' }
//     ]
//   },
//   {
//     id: 'channel-support',
//     title: 'Channel Support',
//     icon: 'Wifi',
//     articles: [
//       { id: 'email', title: 'Email (Google Workspace, Microsoft 365, SMTP, SendGrid, Mailgun, Amazon SES)' },
//       { id: 'linkedin', title: 'LinkedIn (Automation & Semi-automation/Co-pilot)' },
//       { id: 'cold-calling', title: 'Cold Calling' },
//       { id: 'whatsapp', title: 'WhatsApp' }
//     ]
//   },
//   {
//     id: 'email-deliverability',
//     title: 'Email Deliverability',
//     icon: 'Mail',
//     articles: [
//       { id: 'warmup', title: 'Warmup AI Agent (WarmupHero)' },
//       { id: 'throttling', title: 'Email Throttling' },
//       { id: 'esp-matching', title: 'ESP Matching' },
//       { id: 'block-lists', title: 'Block Lists' },
//       { id: 'blacklist-monitoring', title: 'Blacklist Monitoring' },
//       { id: 'custom-tracking', title: 'Custom Tracking Domains' },
//       { id: 'spintax', title: 'Spintax' },
//       { id: 'inbox-rotation', title: 'Inbox Rotation' }
//     ]
//   },
//   {
//     id: 'spf-dkim-dmarc',
//     title: 'SPF/DKIM/DMARC Setup',
//     icon: 'Shield',
//     articles: [
//       { id: 'godaddy', title: 'GoDaddy' },
//       { id: 'namecheap', title: 'Namecheap' },
//       { id: 'hostgator', title: 'Hostgator' },
//       { id: 'microsoft-365', title: 'Microsoft 365' },
//       { id: 'google-workspace', title: 'Google Workspace' }
//     ]
//   },
//   {
//     id: 'ai-automation',
//     title: 'AI Automation',
//     icon: 'Bot',
//     articles: [
//       { id: 'sentiment-classifier', title: 'Sentiment Classifier Agent' },
//       { id: 'out-of-office', title: 'Out-of-Office Detection & Rescheduling' },
//       { id: 'ai-response', title: 'AI Response Agent' },
//       { id: 'workflow-automation', title: 'Workflow Automation' }
//     ]
//   },
//   {
//     id: 'integrations',
//     title: 'Integrations',
//     icon: 'Puzzle',
//     articles: [
//       { id: 'hubspot', title: 'HubSpot' },
//       { id: 'salesforce', title: 'Salesforce' },
//       { id: 'zoho', title: 'Zoho' },
//       { id: 'pipedrive', title: 'Pipedrive' },
//       { id: 'zapier', title: 'Zapier' },
//       { id: 'clay', title: 'Clay' },
//       { id: 'make', title: 'Make.com' },
//       { id: 'slack', title: 'Slack' },
//       { id: 'calendly', title: 'Calendly' },
//       { id: 'rb2b', title: 'RB2B' },
//       { id: 'webhooks', title: 'Webhooks' }
//     ]
//   },
//   {
//     id: 'team-management',
//     title: 'Team & Agency Management',
//     icon: 'Users',
//     articles: [
//       { id: 'permissions', title: 'Role-based Permissions' },
//       { id: '2fa', title: '2FA' },
//       { id: 'multi-client', title: 'Multi-client Agency Features' }
//     ]
//   },
//   {
//     id: 'reports-analytics',
//     title: 'Reports',
//     icon: 'BarChart',
//     articles: [
//       { id: 'campaign-reports', title: 'Campaign Reports' },
//       { id: 'email-reports', title: 'Email Reports' },
//       { id: 'multichannel-reports', title: 'Multichannel Reports' },
//       { id: 'tracking', title: 'Open/Click Tracking' }
//     ]
//   },
//   {
//     id: 'guides',
//     title: 'Guides & Cheat Sheets',
//     icon: 'BookOpen',
//     articles: [
//       { id: 'open-rates', title: 'Best Practices for Open Rates' },
//       { id: 'bounce-rates', title: 'Bounce Rates' },
//       { id: 'reply-rates', title: 'Reply Rates' },
//       { id: 'spam-avoidance', title: 'Spam Avoidance' },
//       { id: 'human-like-sending', title: 'Human-like Sending' }
//     ]
//   }
// ];

// export function Sidebar({ isOpen, onClose }: SidebarProps) {
//   const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
//   const pathname = usePathname();

//   // Initialize with all categories expanded (optional)
//   useEffect(() => {
//     setExpandedCategories(new Set(sidebarCategories.map(cat => cat.id)));
//   }, []);

//   const toggleCategory = (categoryId: string) => {
//     setExpandedCategories(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(categoryId)) {
//         newSet.delete(categoryId);
//       } else {
//         newSet.add(categoryId);
//       }
//       return newSet;
//     });
//   };

//   const isActive = (articleId: string) => {
//     return pathname?.includes(articleId);
//   };

//   const getIcon = (iconName: string) => {
//     const IconComponent = (Icons as any)[iconName];
//     return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
//   };

//   return (
//     <aside
//       className={`fixed left-0 top-50 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
//         isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
//       } lg:translate-x-0`}
//     >
//       <div className="h-full overflow-y-auto py-6 px-4">
//         <nav className="space-y-1">
//           {sidebarCategories.map((category) => {
//             const isExpanded = expandedCategories.has(category.id);
//             const Icon = (Icons as any)[category.icon];

//             return (
//               <div key={category.id} className="mb-2">
//                 <button
//                   onClick={() => toggleCategory(category.id)}
//                   className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="flex items-center gap-3">
//                     {Icon && <Icon className="w-4 h-4 text-gray-500" />}
//                     <span>{category.title}</span>
//                   </div>
//                   <ChevronDown
//                     className={`w-4 h-4 text-gray-500 transition-transform ${
//                       isExpanded ? 'rotate-180' : ''
//                     }`}
//                   />
//                 </button>

//                 <AnimatePresence initial={false}>
//                   {isExpanded && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className="overflow-hidden"
//                     >
//                       <div className="pl-11 pr-3 py-1 space-y-1">
//                         {category.articles.map((article) => (
//                           <Link
//                             key={article.id}
//                             href={`/docs/${category.id}/${article.id}`}
//                             onClick={onClose}
//                             className={`block px-3 py-2 text-sm rounded-md transition-colors ${
//                               isActive(article.id)
//                                 ? 'bg-blue-50 text-blue-600 font-medium'
//                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                             }`}
//                           >
//                             {article.title}
//                           </Link>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             );
//           })}
//         </nav>
//       </div>
//     </aside>
//   );
// }



import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarCategories = [
  {
    id: 'quick-start',
    title: 'Quick Start',
    icon: 'Rocket',
    articles: [
      { id: 'free-trail',          title: 'Free-trail' },
      { id: 'features-snapshot',    title: 'features-snapshot' },
     ],
  },

   {
    id: 'app-section',
    title: 'App Section',
    icon: 'Blocks',
    articles: [
      { id: 'get-started',          title: 'Get Started' },
      { id: 'campaign-dashboard',    title: 'Campaign dashboard' },
      { id: 'prospects',         title: 'Prospects' },
      { id: 'leadfinder',         title: 'LeadFinder' },
      { id: 'settings',         title: 'settings' },

    ],
  },

  {
    id: 'create-campaigns',
    title: 'Create Campaigns',
    icon: 'Megaphone',
    articles: [
      { id: 'email-list',       title: 'Email List' },
      { id: 'email-account',   title: 'Email Account' },
      { id: 'email-warmup',       title: 'Email Warmup' },
      { id: 'email-campaign',      title: 'Email Campaign' },
      { id: 'ai-email-campaign',   title: 'AI Email Campaign' },
      { id: 'manual-campaign',    title: 'Manual Campaign' },
    ],
  },
  // {
  //   id: 'buy-domains-mailboxes',
  //   title: 'Buy Secondary Domains & Mailboxes',
  //   icon: 'Globe',
  //   articles: [
  //     { id: 'buy-domains-emails',  title: 'How to buy secondary domains & emails?' },
  //   ],
  // },
  {
    id: 'channel-support',
    title: 'Channel Support',
    icon: 'Wifi',
    articles: [
      { id: 'google-o-auth',       title: 'Google OAuth Setup'},
      { id: 'google-app-password',            title: 'Google App Password' },
      { id: 'microsoft365',        title: 'Microsoft 365' },
    ],
  },
  {
    id: 'email-deliverability',
    title: 'Email Deliverability',
    icon: 'Mail',
    articles: [
      { id: 'inbox-warmup',        title: 'Inbox Warmup' },
      { id: 'spam-deliverability', title: 'Spam & Deliverability' },
      { id: 'esp-matching',        title: 'ESP Matching' },
      { id: 'custom-tracking',     title: 'Custom Tracking Domains' },
      { id: 'inbox-rotation',      title: 'Inbox Rotation' },
    ],
  },
  // {
  //   id: 'spf-dkim-dmarc',
  //   title: 'SPF/DKIM/DMARC Setup',
  //   icon: 'Shield',
  //   articles: [
  //     { id: 'godaddy',             title: 'GoDaddy' },
  //     { id: 'namecheap',           title: 'Namecheap' },
  //     { id: 'hostgator',           title: 'Hostgator' },
  //     { id: 'microsoft-365',       title: 'Microsoft 365' },
  //     { id: 'google-workspace',    title: 'Google Workspace' },
  //   ],
  // },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    icon: 'Bot',
    articles: [
      { id: 'ai-response',         title: 'AI Response Agent' },
      { id: 'workflow-automation', title: 'Workflow Automation' },
    ],
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: 'Puzzle',
    articles: [
      { id: 'hubspot',             title: 'HubSpot' },
      { id: 'salesforce',          title: 'Salesforce' },
      { id: 'zoho',                title: 'Zoho' },
      { id: 'pipedrive',           title: 'Pipedrive' },
      { id: 'zapier',              title: 'Zapier' },
      { id: 'clay',                title: 'Clay' },
      { id: 'make',                title: 'Make.com' },
      { id: 'slack',               title: 'Slack' },
      { id: 'calendly',            title: 'Calendly' },
      { id: 'rb2b',                title: 'RB2B' },
      { id: 'webhooks',            title: 'Webhooks' },
    ],
  },
  {
    id: 'team-management',
    title: 'Team & Agency Management',
    icon: 'Users',
    articles: [
      { id: 'permissions',         title: 'Role-based Permissions' },
      { id: '2fa',                 title: '2FA' },
      { id: 'multi-client',        title: 'Multi-client Agency Features' },
    ],
  },
  {
    id: 'reports-analytics',
    title: 'Reports',
    icon: 'BarChart',
    articles: [
      { id: 'campaign-reports',    title: 'Campaign Reports' },
      { id: 'email-reports',       title: 'Email Reports' },
      { id: 'multichannel-reports',title: 'Multichannel Reports' },
      { id: 'tracking',            title: 'Open/Click Tracking' },
    ],
  },
  {
    id: 'guides',
    title: 'Guides & Cheat Sheets',
    icon: 'BookOpen',
    articles: [
      { id: 'open-rates',          title: 'Best Practices for Open Rates' },
      { id: 'bounce-rates',        title: 'Bounce Rates' },
      { id: 'reply-rates',         title: 'Reply Rates' },
      { id: 'spam-avoidance',      title: 'Spam Avoidance' },
      { id: 'human-like-sending',  title: 'Human-like Sending' },
    ],
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  // Start with all categories expanded
  useEffect(() => {
    setExpandedCategories(new Set(sidebarCategories.map((cat) => cat.id)));
  }, []);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      next.has(categoryId) ? next.delete(categoryId) : next.add(categoryId);
      return next;
    });
  };

  const isActive = (articleId: string) => pathname?.includes(articleId);

  return (
    <aside
      className={`fixed left-0 top-[90px] h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
        isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="h-full overflow-y-auto py-6 px-4">
        <nav className="space-y-1">
          {sidebarCategories.map((category) => {
            const isExpanded = expandedCategories.has(category.id);
            const Icon = (Icons as any)[category.icon];

            return (
              <div key={category.id} className="mb-2">
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-4 h-4 text-gray-500" />}
                    <span>{category.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Article links */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-10 pr-2 py-1 space-y-0.5">
                        {category.articles.map((article) => (
                          <Link
                            key={article.id}
                            href={`/docs/${category.id}/${article.id}`}
                            onClick={onClose}
                            className={`flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors ${
                              isActive(article.id)
                                ? 'bg-blue-50 text-blue-700 font-semibold border-r-2 border-blue-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <span className="leading-snug">{article.title}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}