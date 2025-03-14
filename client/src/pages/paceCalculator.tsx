import { useState, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CalculationType = 'distance' | 'pace' | 'time';

export function PaceCalculator() {
  const [isMetric, setIsMetric] = useState(false);
  const [calculationType, setCalculationType] = useState<CalculationType>('time');
  const [distance, setDistance] = useState('');
  const [pace, setPace] = useState('');
  const [time, setTime] = useState('');

  const calculate = useCallback(() => {
    const d = parseFloat(distance);
    const p = parseFloat(pace); // minutes per mile/km
    const t = parseFloat(time); // total minutes

    if (calculationType === 'distance' && !isNaN(p) && !isNaN(t)) {
      setDistance((t / p).toFixed(2));
    } else if (calculationType === 'pace' && !isNaN(d) && !isNaN(t)) {
      setPace((t / d).toFixed(2));
    } else if (calculationType === 'time' && !isNaN(d) && !isNaN(p)) {
      setTime((d * p).toFixed(2));
    }
  }, [calculationType, distance, pace, time]);

  const handleInputChange = (type: CalculationType, value: string) => {
    setCalculationType(type);
    if (type === 'distance') setDistance('');
    else if (type === 'pace') setPace('');
    else setTime('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Running Pace Calculator</CardTitle>
          <div className="flex items-center space-x-2 mt-2">
            <Switch
              checked={isMetric}
              onCheckedChange={setIsMetric}
              id="metric-toggle"
            />
            <Label htmlFor="metric-toggle">
              {isMetric ? 'Kilometers' : 'Miles'}
            </Label>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Distance ({isMetric ? 'km' : 'mi'})</Label>
            <Input
              type="number"
              value={distance}
              onChange={(e) => {
                handleInputChange('distance', e.target.value);
                setDistance(e.target.value);
              }}
              placeholder="Enter distance"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label>Pace (min/{isMetric ? 'km' : 'mi'})</Label>
            <Input
              type="number"
              value={pace}
              onChange={(e) => {
                handleInputChange('pace', e.target.value);
                setPace(e.target.value);
              }}
              placeholder="Enter pace"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label>Total Time (minutes)</Label>
            <Input
              type="number"
              value={time}
              onChange={(e) => {
                handleInputChange('time', e.target.value);
                setTime(e.target.value);
              }}
              placeholder="Enter time"
              step="0.01"
            />
          </div>

          <Button 
            onClick={calculate}
            className="w-full"
          >
            Calculate
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
