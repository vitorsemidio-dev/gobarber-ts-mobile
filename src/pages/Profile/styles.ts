import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 30px 120px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 32px;
`;
