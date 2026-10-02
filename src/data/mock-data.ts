export interface Path {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: number;
  totalModules: number;
  totalLessons: number;
  progressPercent: number;
  iconName: string;
}

export interface Lesson {
  id: string;
  pathId: string;
  title: string;
  durationMinutes: number;
  order: number;
  completed: boolean;
  videoUrl?: string;
  summary: string;
  notes: {
    title: string;
    content: string;
  }[];
  keyCommands: {
    command: string;
    description: string;
  }[];
  roomId?: string;
}

export interface Room {
  id: string;
  title: string;
  category: "Linux" | "Web App" | "Network" | "Privilege Escalation";
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  estimatedMinutes: number;
  description: string;
  targetIp: string;
  vulnerabilityClass: string;
  tasks: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    requiresFlag: boolean;
  }[];
  flag: string;
  hints: {
    id: number;
    text: string;
    cost: number;
    revealed: boolean;
  }[];
  reflection: {
    whatHappened: string;
    whyItHappens: string;
    howToFix: string;
    secureConfigSnippet: string;
  };
}

export const MOCK_PATHS: Path[] = [
  {
    id: "linux-fundamentals",
    title: "Linux Fundamentals for Hackers",
    description: "Master the operating system powering the web and modern infrastructure. Filesystem, permissions, processes, and terminal defense.",
    level: "Beginner",
    estimatedHours: 4,
    totalModules: 3,
    totalLessons: 5,
    progressPercent: 60,
    iconName: "Terminal"
  },
  {
    id: "web-app-security",
    title: "Web Application Security Basics",
    description: "Understand the OWASP Top 10 by attacking real vulnerabilities: SQL Injection, XSS, and broken access controls.",
    level: "Beginner",
    estimatedHours: 8,
    totalModules: 5,
    totalLessons: 12,
    progressPercent: 10,
    iconName: "Globe"
  },
  {
    id: "network-fundamentals",
    title: "Network Fundamentals & Traffic Analysis",
    description: "Explore TCP/IP, packet crafting, port scanning, and protocol weaknesses in sandboxed networks.",
    level: "Intermediate",
    estimatedHours: 6,
    totalModules: 4,
    totalLessons: 8,
    progressPercent: 0,
    iconName: "Network"
  },
  {
    id: "pentesting-methodology",
    title: "Intro to Pentesting Methodology",
    description: "Structured penetration testing framework: reconnaissance, weaponization, delivery, exploitation, and post-exploitation reporting.",
    level: "Advanced",
    estimatedHours: 12,
    totalModules: 6,
    totalLessons: 15,
    progressPercent: 0,
    iconName: "ShieldAlert"
  }
];

export const MOCK_LESSONS: Lesson[] = [
  {
    id: "linux-1",
    pathId: "linux-fundamentals",
    title: "Filesystem Basics & Navigation",
    durationMinutes: 10,
    order: 1,
    completed: true,
    summary: "Navigate the hierarchical Linux filesystem tree and understand key standard directories like /etc, /var, and /bin.",
    notes: [
      {
        title: "The Unix Directory Structure",
        content: "Unlike Windows with drive letters (C:, D:), Linux unifies all storage devices under a single root directory '/'."
      },
      {
        title: "Absolute vs. Relative Paths",
        content: "An absolute path always begins with '/' (e.g. /var/log/auth.log). A relative path is resolved from your current working directory (e.g. ../config.json)."
      }
    ],
    keyCommands: [
      { command: "pwd", description: "Print working directory" },
      { command: "ls -la", description: "List all files including hidden ones with permissions" },
      { command: "cd /var/log", description: "Change directory to system logs" }
    ]
  },
  {
    id: "linux-2",
    pathId: "linux-fundamentals",
    title: "Permissions, Users & SUID Flags",
    durationMinutes: 12,
    order: 2,
    completed: true,
    summary: "Deep dive into POSIX permissions (rwx), user ownership, and dangerous permission configurations like SUID.",
    notes: [
      {
        title: "Understanding Octal & Symbolic Permissions",
        content: "r=4, w=2, x=1. A permission string like -rwxr-xr-- translates to 754."
      }
    ],
    keyCommands: [
      { command: "chmod 755 script.sh", description: "Make script executable by all, writable only by owner" },
      { command: "find / -perm -u=s -type f 2>/dev/null", description: "Locate SUID binaries that execute as root" }
    ]
  },
  {
    id: "linux-5",
    pathId: "linux-fundamentals",
    title: "The Shell as an Attack Surface: Anonymous FTP",
    durationMinutes: 15,
    order: 5,
    completed: false,
    roomId: "room-ftp-anon",
    summary: "Discover how default or misconfigured network daemons allow attackers to interact directly with internal filesystems.",
    notes: [
      {
        title: "What is File Transfer Protocol (FTP)?",
        content: "FTP runs over port 21. Standard installations require user authentication, but misconfigurations frequently leave anonymous access enabled with default accounts."
      },
      {
        title: "Reconnaissance with Nmap",
        content: "Use service banner grabbing (`-sV`) to find out if the FTP daemon is listening and what version is running."
      }
    ],
    keyCommands: [
      { command: "nmap -sV -p 21 <target_ip>", description: "Scan port 21 and identify service version" },
      { command: "ftp <target_ip>", description: "Connect to target FTP server" }
    ]
  }
];

export const MOCK_ROOM: Room = {
  id: "room-ftp-anon",
  title: "Vulnerable Service Lab: Anonymous File Transfer",
  category: "Linux",
  difficulty: "Easy",
  points: 100,
  estimatedMinutes: 20,
  description: "You have been contracted to perform an authorized security assessment of Northwind Logistics' staging server. Reconnaissance indicates a legacy daemon running on the perimeter.",
  targetIp: "10.50.12.20",
  vulnerabilityClass: "Anonymous/misconfigured services",
  tasks: [
    {
      id: 1,
      title: "Perform Port Scan",
      description: "Scan the target container at 10.50.12.20 and locate the active FTP port.",
      completed: true,
      requiresFlag: false
    },
    {
      id: 2,
      title: "Enumerate Authentication",
      description: "Attempt anonymous authentication to verify if unauthorized access is allowed.",
      completed: false,
      requiresFlag: false
    },
    {
      id: 3,
      title: "Retrieve Root Staging Flag",
      description: "Extract the secret file located on the target server and submit its contents below.",
      completed: false,
      requiresFlag: true
    }
  ],
  flag: "CYBEROPS{an0nym0u5_l0g1n_d3t3ct3d}",
  hints: [
    {
      id: 1,
      text: "When prompted for username, try 'anonymous' with any password (or leave blank).",
      cost: 10,
      revealed: false
    },
    {
      id: 2,
      text: "Once inside, use 'ls -la' to see hidden files, then 'get flag.txt' or read it directly.",
      cost: 20,
      revealed: false
    }
  ],
  reflection: {
    whatHappened: "You successfully authenticated to an internal vsftpd server without providing credentials by supplying the 'anonymous' username.",
    whyItHappens: "Legacy FTP servers historically allowed anonymous downloads for public distributions. In modern private infrastructure, leaving `anonymous_enable=YES` in vsftpd.conf allows any attacker on the network to read sensitive internal assets.",
    howToFix: "Disable anonymous logins in the daemon configuration and ensure authentication is strictly tied to validated PAM/system credentials.",
    secureConfigSnippet: `# /etc/vsftpd.conf
anonymous_enable=NO
local_enable=YES
write_enable=YES
chroot_local_user=YES`
  }
};
