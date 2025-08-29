import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-advanced-security',
  imports: [CommonModule, RouterLink],
  templateUrl: './advanced-security.html',
  styleUrl: './advanced-security.scss'
})
export class AdvancedSecurity {
  securityModules = [
    {
      id: 'secret-risk-assessment',
      title: 'Secret Risk Assessment',
      description: 'Evaluate and assess potential security risks from exposed secrets in your codebase.',
      icon: '🔍',
      features: [
        'Comprehensive risk analysis',
        'Priority-based vulnerability scoring',
        'Impact assessment reports',
        'Remediation recommendations'
      ]
    },
    {
      id: 'secret-scanning',
      title: 'Secret Scanning',
      description: 'Automatically detect and prevent secrets from being committed to your repository.',
      icon: '🔐',
      features: [
        'Real-time secret detection',
        'Custom pattern matching',
        'Historical repository scanning',
        'Integration with CI/CD pipelines'
      ]
    },
    {
      id: 'code-scanning',
      title: 'Code Scanning',
      description: 'Static application security testing (SAST) to identify vulnerabilities in your code.',
      icon: '🛡️',
      features: [
        'Multi-language support',
        'Custom CodeQL queries',
        'Automated vulnerability detection',
        'False positive reduction'
      ]
    },
    {
      id: 'auto-fix',
      title: 'Auto-Fix',
      description: 'Automatically generate and suggest fixes for common security vulnerabilities.',
      icon: '🔧',
      features: [
        'AI-powered fix suggestions',
        'One-click remediation',
        'Smart code transformations',
        'Learning from codebase patterns'
      ]
    },
    {
      id: 'security-overview',
      title: 'Security Overview',
      description: 'Centralized dashboard for monitoring security posture across all repositories.',
      icon: '📊',
      features: [
        'Real-time security metrics',
        'Trend analysis and reporting',
        'Cross-repository insights',
        'Executive security summaries'
      ]
    },
    {
      id: 'security-campaign',
      title: 'Security Campaign',
      description: 'Orchestrated security initiatives to improve security across your organization.',
      icon: '🎯',
      features: [
        'Targeted security improvements',
        'Progress tracking and metrics',
        'Team collaboration tools',
        'Campaign effectiveness analysis'
      ]
    },
    {
      id: 'administration',
      title: 'Administration',
      description: 'Enterprise-grade management and configuration of security policies and settings.',
      icon: '⚙️',
      features: [
        'Policy management',
        'User access controls',
        'Compliance reporting',
        'Integration configuration'
      ]
    }
  ];
}