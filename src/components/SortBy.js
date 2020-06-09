import ActionSheet from "react-native-actions-sheet";
import React, { createRef, Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const actionSheetRef = createRef();

class SortBy extends Component {

  render() {
    const { handleSortTitleAZ, handleSortTitleZA, handleSortAuthorAZ, handleSortAuthorZA } = this.props
    return (
      <View
        style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 1 }}
      >
        <TouchableOpacity>
          <Button onPress={() => {
            actionSheetRef.current?.setModalVisible();
          }}
            icon={
              <MaterialIcons name="sort" size={30} color="white" />
            }
            buttonStyle={{ width: 60, height: 60, borderRadius: 50, }}
            raised
          />
        </TouchableOpacity>

        <ActionSheet ref={actionSheetRef} CustomHeaderComponent={<Button
          title="Sort By"
          type="clear"
          disabled
        />} headerAlwaysVisible={true}>
          <View>
            <Button
              title="Title (A-Z)"
              type="clear"
              onPress={() => {
                actionSheetRef.current?.setModalVisible();
                handleSortTitleAZ()
              }}
            />
            <Button
              title="Title (Z-A)"
              type="clear"
              onPress={() => {
                actionSheetRef.current?.setModalVisible();
                handleSortTitleZA()
              }}
            />
            <Button
              title="Author (A-Z)"
              type="clear"
              onPress={() => {
                actionSheetRef.current?.setModalVisible();
                handleSortAuthorAZ()
              }}
            />
            <Button
              title="Author (Z-A)"
              type="clear"
              onPress={() => {
                actionSheetRef.current?.setModalVisible();
                handleSortAuthorZA()
              }}
            />
          </View>
        </ActionSheet>
      </View>
    );
  }


};

export default SortBy;