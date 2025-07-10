import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';

type CustomCheckboxProps = {
  isChecked: boolean;
  onPress: () => void;
  boxBackgroundColor:  { dark: string; light: string };
};

const CustomCheckbox = ({ isChecked, onPress, boxBackgroundColor }: CustomCheckboxProps) => {

      const colorScheme = useColorScheme() ?? 'light';
    
  const scaleValue = new Animated.Value(1);

  const animateCheckbox = () => {
    // Animated.sequence([
    //   Animated.timing(scaleValue, {
    //     toValue: 0.8,
    //     duration: 100,
    //     useNativeDriver: true
    //   }),
    //   Animated.timing(scaleValue, {
    //     toValue: 1,
    //     duration: 100,
    //     useNativeDriver: true
    //   })
    // ]).start();
    onPress();
  };

  return (
    <TouchableOpacity onPress={animateCheckbox} activeOpacity={0.7}>
      <Animated.View style={[
        styles.checkboxContainer,
        // { transform: [{ scale: scaleValue }] },
        {backgroundColor: boxBackgroundColor[colorScheme]},
        isChecked && styles.checkedContainer
      ]}>
        {isChecked && (
          <MaterialIcons name="check" size={20} color="white" />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedContainer: {
    backgroundColor: '#51acb4',
    borderColor: '#51acb4',
  },
});
export default CustomCheckbox;