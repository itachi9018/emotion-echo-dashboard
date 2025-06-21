
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, Filter, Users, Calendar, TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface JournalSummary {
  id: string;
  emotionCategory: 'Happy' | 'Stressed' | 'Anxious' | 'Neutral';
  tags: string[];
  summary: string;
  timestamp: string;
  department: string;
  intensity: number;
}

const JournalsOverview = () => {
  const [timeFilter, setTimeFilter] = useState('week');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [emotionFilter, setEmotionFilter] = useState('all');

  // Mock data - in real app this would come from API
  const journalEntries: JournalSummary[] = [
    {
      id: '1',
      emotionCategory: 'Happy',
      tags: ['achievement', 'team-success', 'motivation'],
      summary: 'User expressed satisfaction with project completion and team collaboration',
      timestamp: '2024-01-15T10:30:00Z',
      department: 'Engineering',
      intensity: 8
    },
    {
      id: '2',
      emotionCategory: 'Stressed',
      tags: ['deadline', 'workload', 'pressure'],
      summary: 'User mentioned feeling overwhelmed with upcoming deadlines',
      timestamp: '2024-01-14T15:45:00Z',
      department: 'Marketing',
      intensity: 7
    },
    {
      id: '3',
      emotionCategory: 'Anxious',
      tags: ['presentation', 'public-speaking', 'uncertainty'],
      summary: 'User expressed concerns about upcoming client presentation',
      timestamp: '2024-01-14T09:20:00Z',
      department: 'Sales',
      intensity: 6
    },
    {
      id: '4',
      emotionCategory: 'Happy',
      tags: ['recognition', 'accomplishment', 'growth'],
      summary: 'User shared positive feedback received from manager',
      timestamp: '2024-01-13T14:15:00Z',
      department: 'Engineering',
      intensity: 9
    },
    {
      id: '5',
      emotionCategory: 'Stressed',
      tags: ['work-life-balance', 'overtime', 'fatigue'],
      summary: 'User mentioned challenges with maintaining work-life balance',
      timestamp: '2024-01-12T18:30:00Z',
      department: 'Operations',
      intensity: 8
    }
  ];

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'Happy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Stressed': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Anxious': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIntensityIcon = (intensity: number) => {
    if (intensity >= 8) return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (intensity >= 6) return <Minus className="w-4 h-4 text-orange-500" />;
    return <TrendingDown className="w-4 h-4 text-green-500" />;
  };

  const filteredEntries = journalEntries.filter(entry => {
    if (departmentFilter !== 'all' && entry.department !== departmentFilter) return false;
    if (emotionFilter !== 'all' && entry.emotionCategory !== emotionFilter) return false;
    return true;
  });

  const groupedEntries = filteredEntries.reduce((acc, entry) => {
    if (!acc[entry.emotionCategory]) {
      acc[entry.emotionCategory] = [];
    }
    acc[entry.emotionCategory].push(entry);
    return acc;
  }, {} as Record<string, JournalSummary[]>);

  const getEmotionStats = () => {
    const total = filteredEntries.length;
    const happy = groupedEntries.Happy?.length || 0;
    const stressed = groupedEntries.Stressed?.length || 0;
    const anxious = groupedEntries.Anxious?.length || 0;

    return { total, happy, stressed, anxious };
  };

  const stats = getEmotionStats();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Journals Overview
          </h1>
          <p className="text-gray-600 mt-1">Anonymized emotional wellness insights from team journals</p>
        </div>
      </div>

      {/* Privacy Disclaimer */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Privacy Protection</h3>
              <p className="text-sm text-blue-800">
                All journal entries are anonymized and summarized to protect individual privacy. 
                Personal identifiers and detailed content are not accessible. This data is used solely 
                for organizational wellness insights and trend analysis.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Time Period</label>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Last 24 Hours</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Department</label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Emotion Category</label>
              <Select value={emotionFilter} onValueChange={setEmotionFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Emotions</SelectItem>
                  <SelectItem value="Happy">Happy</SelectItem>
                  <SelectItem value="Stressed">Stressed</SelectItem>
                  <SelectItem value="Anxious">Anxious</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Happy</p>
                <p className="text-2xl font-bold text-green-600">{stats.happy}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">😊</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stressed</p>
                <p className="text-2xl font-bold text-orange-600">{stats.stressed}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">😰</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Anxious</p>
                <p className="text-2xl font-bold text-red-600">{stats.anxious}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold">😟</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grouped Entries */}
      <div className="space-y-6">
        {Object.entries(groupedEntries).map(([emotion, entries]) => (
          <Card key={emotion}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Badge className={getEmotionColor(emotion)}>
                  {emotion}
                </Badge>
                <span className="text-lg">{entries.length} entries</span>
              </CardTitle>
              <CardDescription>
                Recent anonymized insights for {emotion.toLowerCase()} emotional state
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div key={entry.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {entry.department}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getIntensityIcon(entry.intensity)}
                          <span className="text-xs text-gray-500">Intensity: {entry.intensity}/10</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{entry.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No journal entries found for the selected filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JournalsOverview;
