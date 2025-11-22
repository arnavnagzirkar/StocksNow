import { useState } from 'react';
import { Save, Database, Bell, Shield, User, Moon, Sun, Monitor } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { useTheme } from '../ThemeProvider';
import { toast } from 'sonner';

export function Settings() {
  const { theme, setTheme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast('Settings saved successfully');
  };

  const handleTestConnection = async (connectionType: string) => {
    toast(`Testing ${connectionType} connection...`);
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success(`${connectionType} connection successful`);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure your research platform and data connections
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="data">Data Sources</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Monitor className="w-5 h-5 text-gray-400" />
              <h2 className="text-gray-900 dark:text-white">Appearance</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition-colors ${
                      theme === 'light'
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-950'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
                    }`}
                  >
                    <Sun className="w-6 h-6" />
                    <span className="text-sm">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-950'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
                    }`}
                  >
                    <Moon className="w-6 h-6" />
                    <span className="text-sm">Dark</span>
                  </button>
                  <button
                    onClick={() => setTheme('system')}
                    className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition-colors ${
                      theme === 'system'
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-950'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
                    }`}
                  >
                    <Monitor className="w-6 h-6" />
                    <span className="text-sm">System</span>
                  </button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      <SelectItem value="gmt">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-gray-400" />
              <h2 className="text-gray-900 dark:text-white">User Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="researcher@stocksnow.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-universe">Default Universe</Label>
                <Select defaultValue="sp500">
                  <SelectTrigger id="default-universe">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sp500">S&P 500</SelectItem>
                    <SelectItem value="russell2000">Russell 2000</SelectItem>
                    <SelectItem value="nasdaq100">NASDAQ 100</SelectItem>
                    <SelectItem value="custom">Custom Universe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Compact Mode</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Show more data in less space
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-5 h-5 text-gray-400" />
              <h2 className="text-gray-900 dark:text-white">Backend API Connection</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-url">API Base URL</Label>
                <div className="flex gap-2">
                  <Input 
                    id="api-url" 
                    placeholder="http://localhost:5000/api"
                    defaultValue="http://localhost:5000/api"
                  />
                  <Button 
                    variant="outline"
                    onClick={() => handleTestConnection('API')}
                  >
                    Test
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Flask backend endpoint for all API calls
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key (Optional)</Label>
                <Input 
                  id="api-key" 
                  type="password"
                  placeholder="Enter API key if required"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Request Caching</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cache API responses to reduce load times
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900 dark:text-white">Market Data Providers</h3>
              <Button variant="outline" size="sm">Add Provider</Button>
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full" />
                    <div>
                      <p className="text-gray-900 dark:text-white">Yahoo Finance</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Primary data source</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Configure</Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTestConnection('Yahoo Finance')}
                  >
                    Test Connection
                  </Button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                    <div>
                      <p className="text-gray-900 dark:text-white">Alpha Vantage</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Alternative data source</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Configure</Button>
                  <Button variant="outline" size="sm">Test Connection</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 dark:text-white mb-4">Data Refresh Settings</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="refresh-frequency">Auto-Refresh Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="refresh-frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="5min">Every 5 minutes</SelectItem>
                    <SelectItem value="15min">Every 15 minutes</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Cache Historical Data</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Store historical data locally for faster access
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-gray-900 dark:text-white mb-6">Model Training Defaults</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-model">Default Model Type</Label>
                <Select defaultValue="xgboost">
                  <SelectTrigger id="default-model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xgboost">XGBoost</SelectItem>
                    <SelectItem value="random-forest">Random Forest</SelectItem>
                    <SelectItem value="linear">Linear Regression</SelectItem>
                    <SelectItem value="ridge">Ridge Regression</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="train-days">Training Days</Label>
                  <Input id="train-days" type="number" defaultValue="252" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="test-days">Test Days</Label>
                  <Input id="test-days" type="number" defaultValue="63" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv-folds">Cross-Validation Folds</Label>
                <Input id="cv-folds" type="number" defaultValue="5" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Retrain Models</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automatically retrain models on schedule
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 dark:text-white mb-4">Compute Resources</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="max-workers">Max Parallel Workers</Label>
                <Input id="max-workers" type="number" defaultValue="4" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Number of parallel jobs for model training
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="memory-limit">Memory Limit (GB)</Label>
                <Input id="memory-limit" type="number" defaultValue="8" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>GPU Acceleration</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use GPU for faster training (if available)
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-gray-400" />
              <h2 className="text-gray-900 dark:text-white">Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <Label>Model Training Complete</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Notify when model training finishes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <Label>Signal Alerts</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Notify on new high-confidence signals
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <Label>Risk Alerts</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Notify when portfolio risk exceeds thresholds
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <Label>Data Update Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Notify when data refresh completes
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <Label>Experiment Results</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Notify when experiments complete
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 dark:text-white mb-4">Email Notifications</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="researcher@stocksnow.com"
                  defaultValue="researcher@stocksnow.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="digest">Daily Digest</Label>
                <Select defaultValue="8am">
                  <SelectTrigger id="digest">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disabled">Disabled</SelectItem>
                    <SelectItem value="6am">6:00 AM</SelectItem>
                    <SelectItem value="8am">8:00 AM</SelectItem>
                    <SelectItem value="10am">10:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-gray-400" />
              <h2 className="text-gray-900 dark:text-white">Security Settings</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <Button>Update Password</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 dark:text-white mb-4">Session Management</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-logout</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automatically log out after inactivity
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout">Session Timeout (minutes)</Label>
                <Input id="timeout" type="number" defaultValue="30" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 dark:text-white mb-4">API Keys</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-900 dark:text-white">Production API Key</span>
                  <Button variant="outline" size="sm">Regenerate</Button>
                </div>
                <code className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                  sk_prod_xxxxxxxxxxxxxxxxxxxxxxxx
                </code>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-900 dark:text-white">Development API Key</span>
                  <Button variant="outline" size="sm">Regenerate</Button>
                </div>
                <code className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                  sk_dev_xxxxxxxxxxxxxxxxxxxxxxxx
                </code>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}
