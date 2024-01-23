import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {OrderService} from '../services';
import {Colors} from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Display} from '../untils';
import Collapsible from 'react-native-collapsible';

const OrderHistory = ({navigation}) => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      OrderService.getHistoryOrder().then(response => {
        if (response?.status) {
          setHistory(response?.data);
        }
      });
    });
    return unsubscribe;
  }, [history]);
  const toggleAccordion = orderId => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lịch sử giao hàng</Text>
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Lịch sử giao hàng</Text>
      </View>

      {history.map(item => (
        <View style={styles.orderItem} key={item?._id}>
          <Text style={styles.orderDate}>
            {`Ngày đặt hàng: ${new Date(item.createdAt).toLocaleString()}`}
          </Text>

          <TouchableOpacity
            onPress={() => toggleAccordion(item?._id)}
            style={styles.header}>
            <Text style={styles.headerText}>
              {expandedOrderId === item?._id ? 'Ẩn đơn hàng' : 'Hiện đơn hàng'}
            </Text>
          </TouchableOpacity>

          <Collapsible collapsed={expandedOrderId !== item?._id}>
            {item.products.map(productItem => (
              <View key={productItem?.product?.name} style={styles.productItem}>
                <Image
                  source={{uri: productItem?.product?.images}}
                  style={styles.productImage}
                />
                <Text
                  style={
                    styles.productName
                  }>{`Tên\n ${productItem?.product?.name}`}</Text>
                <Text
                  style={
                    styles.productCount
                  }>{`Số lượng\n ${productItem?.count}`}</Text>
              </View>
            ))}
          </Collapsible>

          <Text
            style={
              styles.orderTotal
            }>{`Tổng sản phẩm: ${item?.paymentIntent?.amount?.toFixed(
            1,
          )}00 VNĐ`}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.INACTIVE_GREY,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    flex: 1,
  },
  productCount: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: Colors.DARK_THREE,
    padding: 10,
    borderRadius: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.DEFAULT_WHITE,
  },
});

export default OrderHistory;
