import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Colors, Images, track_order_status} from '../contants';
import {LineDivider, TextButton, TextIconButton} from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DeliveryStatus = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(0);

  function renderInfo() {
    return (
      <View style={{marginTop: 30, paddingHorizontal: 10}}>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.DEFAULT_GREY,
            fontSize: 14,
            lineHeight: 22,
          }}>
          Quá trình giao hàng
        </Text>
      </View>
    );
  }
  function renderTrackOrder() {
    return (
      <View
        style={{
          marginTop: 10,
          paddingVertical: 10,
          borderRadius: 30,
          borderWidth: 2,
          borderColor: Colors.LIGHT_GREY,
          backgroundColor: Colors.SECONDARY_WHITE,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingHorizontal: 10,
          }}>
          <Text style={{fontSize: 20, lineHeight: 22}}>Theo dõi đơn hàng</Text>
          <Text
            style={{color: Colors.DEFAULT_GREY, fontSize: 16, lineHeight: 22}}>
            NY012345
          </Text>
        </View>
        <LineDivider lineStyle={{backgroundColor: Colors.LIGHT_GREY}} />
        <View style={{marginTop: 10, paddingHorizontal: 10}}>
          {track_order_status.track_order_status.map((item, index) => {
            return (
              <View key={`StatusList - ${index}`}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: -5,
                  }}>
                  <Ionicons
                    name={index <= currentStep ? 'checkmark-circle' : 'ban'}
                    size={40}
                    color={
                      index <= currentStep
                        ? Colors.DEFAULT_GREEN
                        : Colors.LIGHT_GREY
                    }
                  />
                  <View style={{marginLeft: 30}}>
                    <Text style={{fontSize: 20, lineHeight: 22}}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        color: Colors.DEFAULT_GREY,
                        fontSize: 14,
                        lineHeight: 22,
                      }}>
                      {item.sub_title}
                    </Text>
                  </View>
                </View>
                {index < track_order_status.track_order_status.length - 1 && (
                  <View>
                    {index < currentStep && (
                      <View
                        style={{
                          height: 50,
                          width: 3,
                          marginLeft: 18,
                          backgroundColor: Colors.DEFAULT_GREEN,
                          zIndex: -1,
                        }}
                      />
                    )}
                    {index >= currentStep && (
                      <Image
                        source={Images.DOTTED_LINE}
                        resizeMode="cover"
                        style={{width: 4, height: 50, marginLeft: 17}}
                      />
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
  function renderFooter() {
    return (
      <View style={{marginTop: 30, marginBottom: 10}}>
        {currentStep < track_order_status.track_order_status.length - 1 && (
          <View style={{flexDirection: 'row', height: 55}}>
            <TextButton
              buttonContainerStyle={{
                width: '40%',
                borderRadius: 30,
                backgroundColor: Colors.LIGHT_GREY,
              }}
              label="Về trang chủ"
              labelStyle={{color: Colors.DEFAULT_GREEN}}
              onPress={() => navigation.navigate('Trang chủ')}
            />
            <TextIconButton
              containerStyle={{
                flex: 1,
                marginLeft: 30,
                borderRadius: 8,
                backgroundColor: Colors.DEFAULT_GREEN,
              }}
              label="Xem map"
              labelStyle={{
                color: Colors.DEFAULT_WHITE,
                fontSize: 20,
                lineHeight: 22,
              }}
              icon={Images.MAPS}
              iconPosition="LEFT"
              iconStyle={{
                width: 25,
                height: 25,
                marginRight: 8,
                tintColor: Colors.DEFAULT_WHITE,
              }}
              onPress={() => navigation.navigate('Trang chủ')}
            />
          </View>
        )}
        {currentStep == track_order_status.track_order_status.length - 1 && (
          <TextButton
            buttonContainerStyle={{height: 55, borderRadius: 8}}
            label="DONE"
            onPress={() => navigation.navigate('Trang chủ')}
          />
        )}
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: Colors.DEFAULT_WHITE,
      }}>
      {renderInfo()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderTrackOrder()}
      </ScrollView>
      {renderFooter()}
    </View>
  );
};

export default DeliveryStatus;

const styles = StyleSheet.create({});
