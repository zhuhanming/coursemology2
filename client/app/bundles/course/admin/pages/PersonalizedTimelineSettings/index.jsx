import { Card, CardContent, TextField, Typography } from '@mui/material';

const PersonalizedTimelineSettings = () => {
  const x = 10;
  return (
    <>
      <Card style={{ marginBottom: '2rem' }}>
        <CardContent>Graph goes here</CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontWeight="bold"
            marginBottom="1rem"
          >
            Personalized Timeline Settings
          </Typography>
          <div style={{ display: 'flex', marginBottom: '1rem' }}>
            <div style={{ marginRight: '1rem' }}>
              <TextField
                label="Fastest that a student can go"
                defaultValue="0.67"
                // size="small"
                type="text"
                helperText="e.g. 0.67 means that a student can complete the course in 67% of the course duration"
              />
            </div>
            <div>
              <TextField
                label="Slowest that a student can go"
                defaultValue="2.0"
                // size="small"
                type="text"
                style={{ marginBottom: '1rem' }}
                helperText="e.g. 2.0 means that a student must complete the course in 200% of the course duration"
              />
            </div>
          </div>
          {/* <div style={{ display: 'flex', marginBottom: '1rem' }}>
            <div style={{ marginRight: '1rem' }}>
              <TextField
                label="Asse"
                defaultValue="0.67"
                // size="small"
                type="text"
                helperText="e.g. 0.67 means that a student can complete the course in 67% of the course duration"
              />
            </div>
            <div>
              <TextField
                label="Slowest that a student can go"
                defaultValue="2.0"
                // size="small"
                type="text"
                style={{ marginBottom: '1rem' }}
                helperText="e.g. 2.0 means that a student must complete the course in 200% of the course duration"
              />
            </div>
          </div> */}
        </CardContent>
      </Card>
    </>
  );
};

export default PersonalizedTimelineSettings;
