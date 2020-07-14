import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { format } from 'date-fns';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersList,
  ProvidersListContainer,
  ProviderContainer,
  ProviderName,
  ProviderAvatar,
  Calendar,
  CalendarTitleText,
  CalendarTitleContainer,
  CalendarTitleIcon,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  ScheduleTitleContainer,
  ScheduleTitleText,
  ScheduleTitleIcon,
  SectionContent,
  Hour,
  HourText,
} from './styles';

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface RouteParams {
  provider_id: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation();

  const routeParams = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.provider_id,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

  useEffect(() => {
    api.get<Provider[]>('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<AvailabilityItem[]>(
        `providers/${selectedProvider}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      )
      .then((response) => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((provider_id: string) => {
    setSelectedProvider(provider_id);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((old_state) => !old_state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar
                source={{
                  uri:
                    provider.avatar_url ||
                    'https://api.adorable.io/avatars/56/abott@adorable.png',
                }}
              />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Content>
        <Calendar>
          <CalendarTitleContainer>
            <CalendarTitleText>Escolha a data</CalendarTitleText>
            <CalendarTitleIcon>
              <Icon name="calendar" size={24} color="#999591" />
            </CalendarTitleIcon>
          </CalendarTitleContainer>

          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>
              Selecionar outra data
            </OpenDatePickerButtonText>
          </OpenDatePickerButton>

          {showDatePicker && (
            <DateTimePicker
              textColor="#f4ede8"
              display="calendar"
              mode="date"
              onChange={handleDateChanged}
              value={selectedDate}
            />
          )}
        </Calendar>

        <Schedule>
          <ScheduleTitleContainer>
            <ScheduleTitleText>Escolha o horário</ScheduleTitleText>
            <ScheduleTitleIcon>
              <Icon name="clock" size={24} color="#999591" />
            </ScheduleTitleIcon>
          </ScheduleTitleContainer>

          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ hourFormatted, available }) => (
                <Hour key={hourFormatted} available={available}>
                  <HourText>{hourFormatted}</HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(({ hourFormatted, available }) => (
                <Hour key={hourFormatted} available={available}>
                  <HourText>{hourFormatted}</HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
        </Schedule>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
